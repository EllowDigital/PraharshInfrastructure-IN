const fs = require('fs');
const path = require('path');

const dir = 'src/routes';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx')).map(f => path.join(dir, f));

const seoProps = {
  'index.tsx': 'title="Praharsh Infrastructure | Building Today, Empowering Tomorrow" description="Leading infrastructure company in Lucknow specializing in solar, electrical, civil, and public lighting projects across India."',
  'about.tsx': 'title="About Us | Praharsh Infrastructure" description="Learn about Praharsh Infrastructure, our mission, values, and our journey in delivering top-tier government and civil projects in Uttar Pradesh."',
  'services.tsx': 'title="Our Services | Praharsh Infrastructure" description="We offer comprehensive services including solar energy installations, road construction, electrical solutions, digital marketing, and government supply."',
  'projects.tsx': 'title="Projects Portfolio | Praharsh Infrastructure" description="Explore our portfolio of completed projects across civil infrastructure, highway lighting, high mast installations, and branding solutions."',
  'contact.tsx': 'title="Contact Us | Praharsh Infrastructure" description="Get in touch with Praharsh Infrastructure. Contact us for project inquiries, partnerships, or support regarding infrastructure and public works."',
  'clients.tsx': 'title="Our Clients | Praharsh Infrastructure" description="We proudly serve a diverse range of clients including UP Tourism, Panchayati Raj Directorate, ODOP, and various municipal corporations across India."',
  'certifications.tsx': 'title="Certifications & Accreditations | Praharsh Infrastructure" description="Praharsh Infrastructure is ISO certified, MSME registered, GeM verified, and empanelled with major government agencies like UPSIC and UPNEDA."',
  'government-capabilities.tsx': 'title="Government Capabilities | Praharsh Infrastructure" description="Our extensive capabilities in government procurement and infrastructure execution, verified by GeM, UPSIC, and other statutory bodies."'
};

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('import { SEO }')) continue;

  const fileName = file.split('/').pop();
  const props = seoProps[fileName] || 'title="Praharsh Infrastructure"';

  let newContent = `import { SEO } from "@/components/site/SEO";\n` + content;
  
  newContent = newContent.replace(/return\s*\(\n\s*(<>|<main>)/i, (match, p1) => {
    return `return (\n    ${p1}\n      <SEO ${props} />`;
  });

  fs.writeFileSync(file, newContent);
  console.log(`Injected SEO into ${fileName}`);
}
