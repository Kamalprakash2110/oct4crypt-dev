'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiCalendar, FiTag, FiClock, FiArrowRight, FiSearch } from 'react-icons/fi';
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

const categories = ['All', 'SOC Analysis', 'Network Security', 'Blue Teaming', 'Threat Hunting'];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cybersecurity
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
              {" "}Blog
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            In-depth articles on SOC analysis, threat hunting, and defensive security strategies
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative search-input">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 search-icon w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 input rounded-lg border-red-500/30 focus:border-red-400"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`btn btn-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'btn-primary'
                    : 'btn-outline'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPosts.map((post, index) => (
            <CyberCard
              key={post.id}
              glow="blue"
              delay={index * 0.1}
              className="h-full"
            >
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-medium rounded">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                      <span className="flex items-center gap-1">
                        <FiCalendar className="w-4 h-4" />
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiClock className="w-4 h-4" />
                        {post.readTime} min
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow space-y-3">
                    <h3 className="text-xl font-semibold text-white hover:text-cyan-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-800/50 border border-gray-700 text-gray-300 text-xs rounded flex items-center gap-1"
                        >
                          <FiTag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-800/50 border border-gray-700 text-gray-300 text-xs rounded">
                          +{post.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800 mt-4">
                    <span className="text-gray-400 text-sm">By {post.author}</span>
                    <span className="text-cyan-400 flex items-center gap-1 text-sm">
                      Read more
                      <FiArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </CyberCard>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">
              No articles found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
