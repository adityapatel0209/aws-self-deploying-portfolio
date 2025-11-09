############################
# Locals
############################

locals {
  domain_name = "awsadi.com"
  bucket_name = "adi-cloud-portfolio"
}

############################
# Route 53 - existing hosted zone
############################

data "aws_route53_zone" "primary" {
  zone_id = "Z08691941A7HJ0PJ4737W"
}

############################
# ACM - existing cert in us-east-1
############################

data "aws_acm_certificate" "cert" {
  provider    = aws.us_east_1
  domain      = local.domain_name
  types       = ["AMAZON_ISSUED"]
  statuses    = ["ISSUED"]
  most_recent = true
}

############################
# S3 Bucket (existing, private)
############################

resource "aws_s3_bucket" "site" {
  bucket = local.bucket_name
}

resource "aws_s3_bucket_public_access_block" "site" {
  bucket = aws_s3_bucket.site.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

############################
# CloudFront Origin Access Control (existing)
############################

resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "oac-portfolio"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"

  lifecycle {
    ignore_changes = [description]
  }
}

############################
# CloudFront Distribution (existing)
############################

resource "aws_cloudfront_distribution" "cdn" {
  enabled         = true
  is_ipv6_enabled = true

  aliases = [
    local.domain_name
  ]

  origin {
    domain_name              = "adi-cloud-portfolio.s3.us-east-1.amazonaws.com"
    origin_id                = "adi-cloud-portfolio.s3.us-east-1.amazonaws.com-mhiltri2wim"
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id

    connection_attempts = 3
    connection_timeout  = 10
  }

  default_root_object = "index.html"

  default_cache_behavior {
    target_origin_id       = "adi-cloud-portfolio.s3.us-east-1.amazonaws.com-mhiltri2wim"
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]

    compress = true

    # Managed CachingOptimized policy ID from AWS
    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"
  }

  price_class = "PriceClass_All"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = data.aws_acm_certificate.cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  # Match existing CloudFront tags so Terraform doesn't try to remove them
  tags = {
    Name = "cloud-portfolio"
  }
}

############################
# Route 53 Alias (root)
############################

resource "aws_route53_record" "root_alias" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = local.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.cdn.domain_name
    zone_id                = aws_cloudfront_distribution.cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

############################
# S3 Bucket Policy - Allow only CloudFront via OAC
############################

resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCloudFrontReadOnly"
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.site.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = "arn:aws:cloudfront::231712211767:distribution/E1QTS358LR5YQB"
          }
        }
      }
    ]
  })
}