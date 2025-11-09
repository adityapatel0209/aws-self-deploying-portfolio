<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>

<h1>AWS Self-Deploying Portfolio</h1>

<p>
  This repository showcases a <strong>production-grade, automated cloud portfolio</strong> designed and built by
  <strong>Aditya Patel</strong>. It demonstrates end-to-end
  <strong>AWS Cloud + DevOps automation</strong> using
  <strong>Terraform</strong>, <strong>CloudFront</strong>, <strong>S3</strong>, <strong>ACM</strong>, <strong>Route 53</strong>, and
  <strong>GitHub Actions with OIDC</strong>.
</p>

<hr />

<h2>Architecture Overview</h2>

<p>
  The following diagram illustrates how the portfolio automatically builds, deploys, and serves globally through AWS:
</p>

<pre>
+------------------------------------------------------+
|                    You (Developer)                   |
|    Push code changes to the 'main' branch on GitHub  |
+-------------------------┬----------------------------+
                          │
                          ▼
+------------------------------------------------------+
|                 GitHub Actions (CI/CD)               |
|  - Builds portfolio project                          |
|  - Authenticates to AWS via OIDC (no static keys)    |
|  - Deploys files to S3 and invalidates CloudFront    |
+-------------------------┬----------------------------+
                          │
                          ▼
+-------------------------------------------------------+
|                        AWS Cloud                      |
|                                                       |
|  +---------------------+     +---------------------+  |
|  |  S3 Bucket (Private)|◄───▶|  CloudFront (CDN)   |  |
|  |  Stores website     |     |  Distributes via    |  |
|  |  files securely     |     |  HTTPS + ACM Cert   |  |
|  +---------------------+     +---------------------+  |
|               ▲                            │          |
|               │ (Restricted Access via OAC)|          |
|               ▼                            ▼          |
|             Route 53 (DNS) ─── awsadi.com (Live Site) |
+-------------------------------------------------------+
                          │
                          ▼
               Visitors access the site
</pre>

<hr />

<h2>Key Features</h2>

<h3>Infrastructure as Code (IaC)</h3>
<ul>
  <li>Entire setup managed using <strong>Terraform</strong> for reproducibility and version control.</li>
  <li>Covers S3, CloudFront, Route 53, ACM, and IAM configurations.</li>
</ul>

<h3>Private & Secure Hosting</h3>
<ul>
  <li>Website files stored in a <strong>private S3 bucket</strong>.</li>
  <li><strong>Origin Access Control (OAC)</strong> ensures CloudFront is the only entity that can fetch data from S3.</li>
</ul>

<h3>Automated Deployment</h3>
<ul>
  <li>GitHub Actions triggers on every push to <code>main</code>.</li>
  <li>Automatically builds and deploys changes to AWS using OIDC-based authentication (no AWS keys).</li>
</ul>

<h3>Global Distribution</h3>
<ul>
  <li>CloudFront caches content at edge locations for low latency.</li>
  <li>HTTPS enabled via <strong>AWS Certificate Manager</strong> for end-to-end encryption.</li>
</ul>

<h3>Custom Domain Integration</h3>
<ul>
  <li>Domain hosted and managed in <strong>Route 53</strong>: <a href="https://awsadi.com">awsadi.com</a></li>
</ul>

<hr />

<h2>Tech Stack</h2>

<table>
  <thead>
    <tr><th>Layer</th><th>Technology</th></tr>
  </thead>
  <tbody>
    <tr><td>Infrastructure</td><td>Terraform</td></tr>
    <tr><td>Cloud</td><td>AWS S3, CloudFront, Route 53, ACM</td></tr>
    <tr><td>CI/CD</td><td>GitHub Actions + OIDC</td></tr>
    <tr><td>Frontend</td><td>React + Vite</td></tr>
    <tr><td>Domain</td><td>awsadi.com</td></tr>
  </tbody>
</table>

<hr />

<h2>Deployment Workflow</h2>

<ol>
  <li>
    <strong>Commit & Push</strong> your changes:
    <pre>git add .
git commit -m "Update portfolio content"
git push origin main</pre>
  </li>
  <li>
    <strong>GitHub Actions</strong> automatically:
    <ul>
      <li>Builds your React/Vite project</li>
      <li>Deploys to your S3 bucket</li>
      <li>Invalidates CloudFront cache for instant updates</li>
    </ul>
  </li>
  <li>
    <strong>Live site updates instantly</strong> at:
    <a href="https://awsadi.com">https://awsadi.com</a>
  </li>
</ol>

<hr />

<h2>Why This Project Matters</h2>

<p>
  This portfolio isn’t just a website — it’s a <strong>complete DevOps pipeline</strong>.
</p>

<ul>
  <li>Secure CI/CD without AWS credentials</li>
  <li>Infrastructure automation with Terraform</li>
  <li>Cloud-native architecture design</li>
  <li>Best practices for real-world cloud deployment</li>
</ul>

<p>
  This is the <strong>same foundation used in enterprise-level AWS environments</strong>.
</p>

<hr />

<h2>Author</h2>
<p><strong>Aditya Patel</strong><br>
Cloud & DevOps Engineer<br>
📍 Toronto, ON<br>
🔗 <a href="https://www.linkedin.com/in/aditya-patel-cloud">LinkedIn</a><br>
🌐 <a href="https://awsadi.com">awsadi.com</a></p>

</body>
</html>
