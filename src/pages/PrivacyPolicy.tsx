import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Privacy Policy</CardTitle>
            <p className="text-muted-foreground mt-2">Last updated: October 27, 2025</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to Fleksibelt. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy explains how we collect, use, and safeguard your information when you use our platform.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p className="font-medium text-foreground">Personal Information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name, email address, and contact information</li>
                  <li>University/school information (for students)</li>
                  <li>Company information (for employers)</li>
                  <li>Profile picture and professional details</li>
                  <li>CV and portfolio information</li>
                </ul>
                
                <p className="font-medium text-foreground mt-4">Usage Information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Job applications and interactions</li>
                  <li>Messages and communications on the platform</li>
                  <li>Platform usage analytics</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
              <div className="space-y-2 text-muted-foreground leading-relaxed">
                <p>We use your information to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Create and manage your account</li>
                  <li>Match students with relevant job opportunities</li>
                  <li>Facilitate communication between students and employers</li>
                  <li>Process payments and transactions</li>
                  <li>Improve our services and user experience</li>
                  <li>Send important updates and notifications</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Rating and Review System</h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Our platform includes a two-way rating system to maintain quality and trust:
                </p>
                
                <div className="bg-secondary p-4 rounded-lg space-y-3 mt-3">
                  <p className="font-medium text-foreground">Students can rate employers:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>After completing a job, students can provide a rating (1-5 stars) and written review</li>
                    <li>Reviews help other students make informed decisions about opportunities</li>
                    <li>All reviews are tied to verified job completions</li>
                  </ul>
                  
                  <p className="font-medium text-foreground mt-4">Employers can rate students:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Employers can rate student performance after job completion</li>
                    <li>Ratings help build student reputation and credibility</li>
                    <li>Reviews are visible on student public profiles</li>
                  </ul>
                  
                  <p className="font-medium text-foreground mt-4">Review Guidelines:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Reviews must be honest, constructive, and professional</li>
                    <li>Personal attacks, discriminatory language, or false information is prohibited</li>
                    <li>We reserve the right to remove reviews that violate our community guidelines</li>
                    <li>Ratings and reviews are permanent once submitted and cannot be edited</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Data Sharing and Disclosure</h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>We share your information only in these circumstances:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>With other users:</strong> Your profile information is visible to relevant parties (students see employer profiles, employers see student profiles)</li>
                  <li><strong>Service providers:</strong> We use trusted third-party services for hosting, payment processing, and analytics</li>
                  <li><strong>Legal requirements:</strong> When required by law or to protect our rights and safety</li>
                  <li><strong>Business transfers:</strong> In case of merger, acquisition, or sale of assets</li>
                </ul>
                <p className="mt-3">
                  We never sell your personal information to third parties for marketing purposes.
                </p>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures to protect your data, including encryption, 
                secure servers, and regular security audits. However, no method of transmission over the internet 
                is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Your Rights</h2>
              <div className="space-y-2 text-muted-foreground leading-relaxed">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access and download your personal data</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your account and data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Object to certain data processing activities</li>
                </ul>
                <p className="mt-3">
                  To exercise these rights, contact us at privacy@fleksibelt.no
                </p>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Cookies and Tracking</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar technologies to enhance your experience, analyze usage, and provide 
                personalized content. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal data only as long as necessary to provide our services and comply with 
                legal obligations. When you delete your account, we will remove or anonymize your personal data 
                within 90 days, except where we are required to retain it by law.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">10. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are intended for users aged 16 and above. We do not knowingly collect information 
                from children under 16. If you believe we have collected such information, please contact us 
                immediately.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">11. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of significant changes 
                via email or through a prominent notice on our platform. Your continued use of Fleksibelt after 
                such changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">12. Contact Us</h2>
              <div className="text-muted-foreground leading-relaxed space-y-2">
                <p>If you have questions about this privacy policy or our data practices, contact us at:</p>
                <div className="bg-secondary p-4 rounded-lg mt-3">
                  <p><strong>Email:</strong> privacy@fleksibelt.no</p>
                  <p><strong>Address:</strong> Fleksibelt AS, Oslo, Norway</p>
                  <p><strong>Support:</strong> help@fleksibelt.no</p>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
