import React, { useEffect, useRef } from 'react';
import { skillsData } from '../../data/portfolioData';
import AwsCloudIcon from '../../assets/aws/aws-cloud.svg';
import AwsEc2Icon from '../../assets/aws/aws-ec2.svg';
import AwsS3Icon from '../../assets/aws/aws-s3.svg';
import AwsRdsIcon from '../../assets/aws/aws-rds.svg';
import AwsVpcIcon from '../../assets/aws/aws-vpc.svg';
import AwsIamIcon from '../../assets/aws/aws-iam.svg';
import AwsLambdaIcon from '../../assets/aws/aws-lambda.svg';
import AwsApiGatewayIcon from '../../assets/aws/aws-api-gateway.svg';
import AwsCloudfrontIcon from '../../assets/aws/aws-cloudfront.svg';
import AwsRoute53Icon from '../../assets/aws/aws-route-53.svg';
import AwsCloudwatchIcon from '../../assets/aws/aws-cloudwatch.svg';

// Updated Skills component with new categories and icons
interface SkillsProps {
  setActiveSection: (section: string) => void;
}

const Skills: React.FC<SkillsProps> = ({ setActiveSection }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('skills');
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [setActiveSection]);

  const getSkillIcon = (skillName: string): string | undefined => {
    const iconMap: Record<string, string> = {
      AWS: AwsCloudIcon,
      EC2: AwsEc2Icon,
      S3: AwsS3Icon,
      RDS: AwsRdsIcon,
      VPC: AwsVpcIcon,
      IAM: AwsIamIcon,
      Lambda: AwsLambdaIcon,
      'API Gateway': AwsApiGatewayIcon,
      CloudFront: AwsCloudfrontIcon,
      'Route 53': AwsRoute53Icon,
      CloudWatch: AwsCloudwatchIcon,
      Linux: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
      Docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      Terraform: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg',
      'GitHub Actions': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      Nginx: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
      Prometheus: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg',
      Grafana: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg',
      'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      'REST APIs': 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg',
      'React.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      TypeScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      Bash: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
      Git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      GitHub: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg'
    };

    return iconMap[skillName];
  };

  const invertedIcons = new Set(['Express.js', 'GitHub', 'GitHub Actions', 'Next.js']);

  return (
    <div ref={sectionRef} className="flex flex-col justify-center w-full max-w-6xl mx-auto px-2 md:px-6">
      <div className="space-y-16">
        <div className="fade-in">
          <h2 className="text-3xl md:text-4xl font-bold">Skills</h2>
          <div className="w-16 h-1 bg-white mt-4"></div>
          <p className="text-gray-300 mt-6 max-w-2xl">
            My cloud and DevOps toolkit for architecting AWS, automating infrastructure, and operating reliable systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.toolsAndTech.map((category) => (
            <div 
              key={category.name}
              className="border border-white/10 rounded-xl p-6 hover:border-white/20 
                transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              <h3 className="text-xl font-semibold text-white mb-4">{category.name}</h3>
              <div className="grid grid-cols-2 gap-3">
                {category.skills.map((skill, index) => {
                  const iconSrc = getSkillIcon(skill);
                  return (
                  <div
                    key={skill}
                    className="group relative bg-gray-900/50 backdrop-blur-sm rounded-xl p-3
                      border border-white/10 overflow-hidden transition-all duration-300
                      hover:bg-gray-800/80
                      hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]
                      transform hover:scale-[1.02]"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative z-10 flex items-center gap-2">
                      {iconSrc && (
                        <img 
                          src={iconSrc} 
                          alt={`${skill} icon`} 
                          className={`w-5 h-5 ${invertedIcons.has(skill) ? 'brightness-0 invert' : ''}`}
                        />
                      )}
                      <h3 className="text-sm font-medium group-hover:text-white transition-colors">
                        {skill}
                      </h3>
                    </div>
                    <div className="absolute inset-0 rounded-xl border border-white/0 group-hover:border-white/20 
                      transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
                  </div>
                );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;