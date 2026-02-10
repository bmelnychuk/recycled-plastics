'use client';

import { imprintData } from '@/features/legal/legal-data';
import { useLocalStorage } from 'usehooks-ts';

export default function TermsPage() {
  const [language] = useLocalStorage('language', 'en', {
    serializer: (value) => value,
    deserializer: (value) => value,
  });
  return language === 'de' ? <GermanTermsPage /> : <EnglishTermsPage />;
}

const GermanTermsPage = () => {
  const { appName, contact } = imprintData;

  return (
    <div>
      <h1>Nutzungsbedingungen</h1>
      <section id="introduction">
        <h2>1. Einleitung</h2>
        <p>
          Diese Nutzungsbedingungen ("Bedingungen") regeln Ihre Nutzung von{' '}
          <strong>{appName}</strong>
          ("wir", "uns", "unser"). Durch den Zugriff auf oder die Nutzung von{' '}
          {appName} erklären Sie sich mit diesen Bedingungen einverstanden. Wenn
          Sie nicht einverstanden sind, dürfen Sie den Dienst nicht nutzen.
        </p>
      </section>

      <section id="eligibility">
        <h2>2. Berechtigung</h2>
        <p>
          Sie müssen mindestens 18 Jahre alt sein oder über die
          Geschäftsfähigkeit nach den Gesetzen Ihres Landes verfügen, um{' '}
          {appName} zu nutzen. Durch die Nutzung des Dienstes bestätigen und
          garantieren Sie, dass Sie diese Anforderungen erfüllen.
        </p>
      </section>

      <section id="account">
        <h2>3. Konten</h2>
        <p>
          Um {appName} zu nutzen, müssen Sie möglicherweise ein Konto erstellen,
          indem Sie genaue und vollständige Informationen angeben. Sie sind
          verantwortlich für die Geheimhaltung Ihrer Anmeldedaten und für alle
          Aktivitäten unter Ihrem Konto.
        </p>
      </section>

      <section id="user-content">
        <h2>4. Nutzerdaten</h2>
        <p>
          Sie behalten alle Rechte an den Daten und Inhalten, die Sie in{' '}
          {appName} eingeben. Durch das Übermitteln von Inhalten gewähren Sie
          uns eine eingeschränkte Lizenz, diese zu speichern, zu verarbeiten und
          anzuzeigen, soweit dies zur Bereitstellung des Dienstes erforderlich
          ist.
        </p>
        <p>
          Sie dürfen keine Inhalte hochladen, die rechtswidrig, schädlich sind
          oder Rechte Dritter verletzen.
        </p>
      </section>

      <section id="acceptable-use">
        <h2>5. Akzeptable Nutzung</h2>
        <p>
          Sie verpflichten sich, {appName} nicht zu missbrauchen. Verbotene
          Aktivitäten umfassen:
        </p>
        <ul>
          <li>Versuch, ohne Berechtigung auf den Dienst zuzugreifen</li>
          <li>Störung oder Unterbrechung des Dienstes</li>
          <li>
            Veröffentlichung falscher oder irreführender Angebots- oder
            Nachfrageeinträge
          </li>
          <li>
            Nutzung des Dienstes für rechtswidrige oder betrügerische Zwecke
          </li>
        </ul>
      </section>

      <section id="intellectual-property">
        <h2>6. Geistiges Eigentum</h2>
        <p>
          Die {appName}-Plattform, ihre Software, ihr Design und ihre Inhalte
          (mit Ausnahme Ihrer Nutzerinhalte) gehören uns oder unseren
          Lizenzgebern und sind durch Urheberrechte und andere Gesetze
          geschützt. Sie dürfen diese ohne unsere Erlaubnis nicht kopieren,
          modifizieren oder verbreiten.
        </p>
      </section>

      <section id="third-party">
        <h2>7. Drittanbieterdienste</h2>
        <p>
          {appName} kann Drittanbieterdienste nutzen (z.B. Hosting, Analytik).
          Ihre Nutzung dieser Dienste kann deren eigenen Bedingungen und
          Richtlinien unterliegen.
        </p>
      </section>

      <section id="termination">
        <h2>8. Kündigung</h2>
        <p>
          Wir können Ihren Zugang zu {appName} jederzeit aussetzen oder beenden,
          wenn Sie gegen diese Bedingungen verstoßen oder den Dienst
          rechtswidrig nutzen. Sie können die Nutzung des Dienstes jederzeit
          beenden, indem Sie Ihr Konto löschen.
        </p>
      </section>

      <section id="disclaimer">
        <h2>9. Haftungsausschluss für Gewährleistungen</h2>
        <p>
          {appName} wird "wie besehen" ohne jegliche ausdrückliche oder
          stillschweigende Gewährleistung bereitgestellt, einschließlich, aber
          nicht beschränkt auf Eignung für einen bestimmten Zweck und
          Nichtverletzung. Wir garantieren nicht, dass der Dienst
          unterbrechungsfrei oder fehlerfrei ist.
        </p>
      </section>

      <section id="liability">
        <h2>10. Haftungsbeschränkung</h2>
        <p>
          Im maximal gesetzlich zulässigen Umfang haften wir nicht für
          indirekte, zufällige oder Folgeschäden, die aus Ihrer Nutzung von{' '}
          {appName} resultieren. Unsere Gesamthaftung für jegliche Ansprüche
          übersteigt nicht den Betrag, den Sie uns (falls vorhanden) in den 12
          Monaten vor dem Ereignis, das zum Anspruch führte, gezahlt haben.
        </p>
      </section>

      <section id="changes">
        <h2>11. Änderungen der Bedingungen</h2>
        <p>
          Wir können diese Bedingungen von Zeit zu Zeit aktualisieren. Bei
          wesentlichen Änderungen werden wir Sie wie gesetzlich vorgeschrieben
          benachrichtigen. Durch die weitere Nutzung des Dienstes nach
          Inkrafttreten der Änderungen akzeptieren Sie die neuen Bedingungen.
        </p>
      </section>

      <section id="governing-law">
        <h2>12. Anwendbares Recht</h2>
        <p>
          Diese Bedingungen unterliegen den Gesetzen Deutschlands, ohne
          Berücksichtigung von Kollisionsnormen. Alle Streitigkeiten unterliegen
          der Gerichtsbarkeit der Gerichte in Hamburg, Deutschland.
        </p>
      </section>

      <section id="contact">
        <h2>13. Kontakt</h2>
        <p>
          Wenn Sie Fragen zu diesen Bedingungen haben, kontaktieren Sie uns
          bitte unter:
        </p>
        <ul>
          <li>
            <strong>E-Mail:</strong>{' '}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </li>
        </ul>
      </section>
    </div>
  );
};

const EnglishTermsPage = () => {
  const { appName, contact } = imprintData;

  return (
    <div>
      <h1>Terms of Service</h1>
      <section id="introduction">
        <h2>1. Introduction</h2>
        <p>
          These Terms of Service ("Terms") govern your use of{' '}
          <strong>{appName}</strong>
          ("we", "us", "our"). By accessing or using {appName}, you agree to be
          bound by these Terms. If you do not agree, you must not use the
          service.
        </p>
      </section>

      <section id="eligibility">
        <h2>2. Eligibility</h2>
        <p>
          You must be at least 18 years old or have legal capacity under the
          laws of your country to use {appName}. By using the service, you
          represent and warrant that you meet these requirements.
        </p>
      </section>

      <section id="account">
        <h2>3. Accounts</h2>
        <p>
          To use {appName}, you may need to create an account by providing
          accurate and complete information. You are responsible for maintaining
          the confidentiality of your login credentials and for all activities
          under your account.
        </p>
      </section>

      <section id="user-content">
        <h2>4. User Content</h2>
        <p>
          You retain all rights to the data and content you enter into {appName}
          . By submitting content, you grant us a limited license to store,
          process and display it as necessary to provide the service.
        </p>
        <p>
          You must not upload content that is unlawful, harmful, or infringes
          third-party rights.
        </p>
      </section>

      <section id="acceptable-use">
        <h2>5. Acceptable Use</h2>
        <p>You agree not to misuse {appName}. Prohibited activities include:</p>
        <ul>
          <li>Attempting to access the service without authorization</li>
          <li>Interfering with or disrupting the service</li>
          <li>Posting false or misleading supply or demand listings</li>
          <li>Using the service for unlawful or fraudulent purposes</li>
        </ul>
      </section>

      <section id="intellectual-property">
        <h2>6. Intellectual Property</h2>
        <p>
          The {appName} platform, its software, design and content (excluding
          your user content) are owned by us or our licensors and are protected
          by copyright and other laws. You may not copy, modify, or distribute
          them without our permission.
        </p>
      </section>

      <section id="third-party">
        <h2>7. Third-Party Services</h2>
        <p>
          {appName} may use third-party services (e.g., hosting, analytics).
          Your use of these services may be subject to their own terms and
          policies.
        </p>
      </section>

      <section id="termination">
        <h2>8. Termination</h2>
        <p>
          We may suspend or terminate your access to {appName} at any time if
          you violate these Terms or use the service unlawfully. You may stop
          using the service at any time by deleting your account.
        </p>
      </section>

      <section id="disclaimer">
        <h2>9. Disclaimer of Warranties</h2>
        <p>
          {appName} is provided "as is" without warranties of any kind, whether
          express or implied, including but not limited to fitness for a
          particular purpose and non-infringement. We do not guarantee that the
          service will be uninterrupted or error-free.
        </p>
      </section>

      <section id="liability">
        <h2>10. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, we are not liable for any
          indirect, incidental, or consequential damages resulting from your use
          of {appName}. Our total liability for any claim shall not exceed the
          amount you paid us (if any) in the 12 months preceding the event
          giving rise to the claim.
        </p>
      </section>

      <section id="changes">
        <h2>11. Changes to Terms</h2>
        <p>
          We may update these Terms from time to time. If changes are
          significant, we will notify you as required by law. By continuing to
          use the service after changes take effect, you accept the new Terms.
        </p>
      </section>

      <section id="governing-law">
        <h2>12. Governing Law</h2>
        <p>
          These Terms are governed by the laws of Germany, without regard to
          conflict of law principles. Any disputes shall be subject to the
          jurisdiction of the courts in Hamburg, Germany.
        </p>
      </section>

      <section id="contact">
        <h2>13. Contact</h2>
        <p>If you have questions about these Terms, please contact us at:</p>
        <ul>
          <li>
            <strong>Email:</strong>{' '}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </li>
        </ul>
      </section>
    </div>
  );
};
