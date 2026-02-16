import { motion } from 'framer-motion';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiCalendar, FiClock, FiTag, FiArrowLeft, FiShare2 } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import CyberCard from '@/components/ui/CyberCard';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  category: string;
  author: string;
}

// This function is required for static export
export function generateStaticParams() {
  return [
    { slug: 'intro-to-cybersecurity' },
    { slug: 'threat-detection-basics' },
    { slug: 'security-best-practices' }
  ];
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Advanced Threat Hunting Techniques in Modern SOCs',
    excerpt: 'Explore cutting-edge threat hunting methodologies that are revolutionizing how Security Operations Centers detect and respond to sophisticated cyber threats.',
    content: `# Advanced Threat Hunting Techniques in Modern SOCs

## Introduction

In today's rapidly evolving threat landscape, traditional security measures are no longer sufficient. Security Operations Centers (SOCs) must adopt advanced threat hunting techniques to stay ahead of sophisticated adversaries.

## The Evolution of Threat Hunting

Threat hunting has evolved from reactive investigations to proactive, hypothesis-driven searches. Modern SOCs leverage:

### 1. **Machine Learning-Powered Anomaly Detection**

\`\`\`python
# Example: Network traffic anomaly detection
import tensorflow as tf
from sklearn.preprocessing import StandardScaler

def detect_anomalies(network_data):
    scaler = StandardScaler()
    normalized_data = scaler.fit_transform(network_data)
    
    model = tf.keras.models.load_model('anomaly_detector.h5')
    predictions = model.predict(normalized_data)
    
    return predictions > 0.95  # Threshold for anomaly
\`\`\`

### 2. **MITRE ATT&CK Framework Integration**

Mapping adversary behaviors to the MITRE ATT&CK framework provides:

- Standardized threat classification
- Improved detection coverage
- Enhanced incident response capabilities

### 3. **Automated Threat Intelligence Integration**

Real-time threat intelligence feeds enhance hunting capabilities:

- IOC (Indicators of Compromise) matching
- Dark web monitoring
- Industry-specific threat sharing

## Practical Implementation

### Building a Threat Hunting Hypothesis

1. **Define the Threat Landscape**
2. **Identify Potential Attack Vectors**
3. **Develop Detection Rules**
4. **Validate with Red Team Exercises**

### Tools and Technologies

- **Elastic SIEM** for log aggregation
- **Splunk** for advanced analytics
- **Cortex XDR** for endpoint detection
- **ThreatConnect** for intelligence management

## Case Study: Detecting Living Off the Land Attacks

Living off the land (LOL) attacks use legitimate system tools for malicious purposes. Detection strategies include:

### PowerShell Monitoring

\`\`\`powershell
# Monitor suspicious PowerShell activity
Get-WinEvent -LogName "Microsoft-Windows-PowerShell/Operational" |
Where-Object {$_.Message -match ".*-enc.*"} |
Format-Table TimeCreated, Message
\`\`\`

### Process Creation Monitoring

Track unusual process creation patterns and parent-child relationships.

## Conclusion

Advanced threat hunting requires a combination of technology, process, and human expertise. By implementing these techniques, SOCs can significantly improve their detection capabilities and reduce dwell time.

## References

- [MITRE ATT&CK Framework](https://attack.mitre.org/)
- [SANS Threat Hunting Course](https://www.sans.org/cyber-security-courses/threat-hunting/)
- [Mandiant Threat Intelligence Reports](https://www.mandiant.com/resources/threat-intelligence-reports)`,
    slug: 'advanced-threat-hunting-techniques',
    publishedAt: '2024-01-15',
    readTime: 12,
    tags: ['Threat Hunting', 'SOC', 'MITRE ATT&CK', 'PowerShell'],
    category: 'SOC Analysis',
    author: 'Kamal'
  },
  {
    id: '2',
    title: 'Implementing Zero Trust Architecture in Enterprise Networks',
    excerpt: 'A comprehensive guide to implementing Zero Trust security principles, from network segmentation to identity and access management.',
    content: `# Implementing Zero Trust Architecture in Enterprise Networks

## Understanding Zero Trust

Zero Trust is a security model that assumes no implicit trust and continuously verifies every request as though it originates from an open network.

## Core Principles

### 1. **Never Trust, Always Verify**

Every access request is authenticated, authorized, and encrypted before access is granted.

### 2. **Least Privilege Access**

Users and devices only have access to the resources they absolutely need.

### 3. **Micro-Segmentation**

Network is divided into small zones to prevent lateral movement.

## Implementation Strategy

### Phase 1: Identity and Access Management

\`\`\`yaml
# Example: Okta Zero Trust Policy
apiVersion: okta.com/v1alpha1
kind: Policy
metadata:
  name: zero-trust-access
spec:
  conditions:
    - type: device
      requirements:
        - trusted: true
        - encrypted: true
    - type: location
      requirements:
        - trusted_network: false
        - mfa_required: true
\`\`\`

### Phase 2: Network Segmentation

Implement micro-segmentation using:

- SDN controllers
- Next-generation firewalls
- Container networking

### Phase 3: Continuous Monitoring

Real-time monitoring of:

- User behavior analytics
- Network traffic patterns
- Application access logs

## Benefits and Challenges

### Benefits
- Reduced attack surface
- Improved visibility
- Faster incident response

### Challenges
- Implementation complexity
- User experience impact
- Cost considerations

## Conclusion

Zero Trust is not a product but a philosophy that requires continuous improvement and adaptation.

## References

- [NIST Zero Trust Architecture](https://www.nist.gov/publications/zero-trust-architecture)
- [Forrester Zero Trust Framework](https://www.forrester.com/report/the-zero-trust-extended-ecosystem/)`,
    slug: 'zero-trust-architecture-implementation',
    publishedAt: '2024-01-10',
    readTime: 8,
    tags: ['Zero Trust', 'Network Security', 'Enterprise', 'IAM'],
    category: 'Network Security',
    author: 'Kamal'
  },
  {
    id: '3',
    title: 'Blue Team Operations: Building an Effective Defense',
    excerpt: 'Learn how to structure and optimize Blue Team operations for maximum defensive capability and incident response efficiency.',
    content: `# Blue Team Operations: Building an Effective Defense

## The Blue Team Mission

Blue Teams are responsible for defending organizational assets through detection, response, and recovery from security incidents.

## Organizational Structure

### Core Roles

1. **Security Analysts**
   - Monitor security alerts
   - Investigate potential incidents
   - Escalate critical events

2. **Incident Responders**
   - Lead incident resolution
   - Coordinate with stakeholders
   - Document lessons learned

3. **Threat Hunters**
   - Proactive threat detection
   - Hypothesis-driven investigations
   - Advanced analytics

## Key Processes

### 1. **Continuous Monitoring**

\`\`\`bash
# Example: Real-time log monitoring with Splunk
splunk search "index=security (severity=high OR severity=critical) | stats count by source, signature | where count > 10"
\`\`\`

### 2. **Incident Response Lifecycle**

1. **Preparation**
2. **Detection & Analysis**
3. **Containment**
4. **Eradication**
5. **Recovery**
6. **Lessons Learned**

### 3. **Threat Intelligence Integration**

- IOC sharing
- Industry collaboration
- Automated threat feeds

## Tools and Technologies

### SIEM Solutions
- Splunk Enterprise Security
- IBM QRadar
- Microsoft Sentinel

### Endpoint Detection
- CrowdStrike Falcon
- SentinelOne
- Carbon Black

### Network Security
- Palo Alto Networks
- Cisco Firepower
- Check Point

## Metrics and KPIs

### Detection Metrics
- Mean Time to Detect (MTTD)
- False Positive Rate
- Alert Coverage

### Response Metrics
- Mean Time to Respond (MTTR)
- Containment Time
- Recovery Time

## Building a Culture of Security

### Training and Awareness
- Regular security drills
- Phishing simulations
- Threat briefings

### Collaboration
- Cross-team exercises
- Red Team/Blue Team partnerships
- Industry information sharing

## Conclusion

Effective Blue Team operations require the right combination of people, processes, and technology. Continuous improvement and adaptation are key to staying ahead of threats.

## References

- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [SANS Blue Team Training](https://www.sans.org/blue-team/)
- [FIRST Incident Response Framework](https://www.first.org/)`,
    slug: 'blue-team-operations-guide',
    publishedAt: '2024-01-05',
    readTime: 15,
    tags: ['Blue Team', 'Incident Response', 'SOC', 'Security Operations'],
    category: 'Blue Teaming',
    author: 'Kamal'
  }
];

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Article */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CyberCard className="p-8">
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm font-medium rounded">
                  {post.category}
                </span>
                <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors">
                  <FiShare2 className="w-5 h-5" />
                </button>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
                <span className="flex items-center gap-1">
                  <FiCalendar className="w-4 h-4" />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <FiClock className="w-4 h-4" />
                  {post.readTime} min read
                </span>
                <span>By {post.author}</span>
              </div>
            </header>

            {/* Content */}
            <div className="prose prose-invert prose-cyan max-w-none">
              <div className="text-gray-300 leading-relaxed">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>

            {/* Tags */}
            <footer className="mt-8 pt-8 border-t border-gray-800">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-800/50 border border-gray-700 text-gray-300 text-sm rounded-full flex items-center gap-1"
                  >
                    <FiTag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </footer>
          </CyberCard>

          {/* Related Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts
                .filter(p => p.id !== post.id && p.category === post.category)
                .slice(0, 2)
                .map((relatedPost) => (
                  <CyberCard key={relatedPost.id} glow="blue" className="p-6">
                    <Link href={`/blog/${relatedPost.slug}`} className="block">
                      <h3 className="text-lg font-semibold text-white mb-2 hover:text-cyan-400 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{new Date(relatedPost.publishedAt).toLocaleDateString()}</span>
                        <span>{relatedPost.readTime} min read</span>
                      </div>
                    </Link>
                  </CyberCard>
                ))}
            </div>
          </motion.div>
        </motion.article>
      </div>
    </div>
  );
}
