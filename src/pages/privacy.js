import { Pane, Button, Link } from 'evergreen-ui';
import { useRouter } from 'next/router';

const PrivacyPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/user');
  };

  return (
    <Pane display="flex" alignItems="center" justifyContent="center" height="100vh">
      <Pane background="white" padding={40} maxWidth={400}>
        <h1>Privacy Statement</h1>
        <p>
          This Privacy Statement describes how SportsLeague collects, uses, and discloses personal information when you use our services. Please read this statement carefully to understand our practices regarding your personal data.
        </p>
        <h2>Information We Collect</h2>
        <p>
          We collect personal information that you provide to us when registering for an account, such as your name, email address, and telephone number.
        </p>
        <h2>How We Use Your Information</h2>
        <p>
          We use the personal information you provide to create and manage your account, communicate with you, and provide the services you requested. We may also use your information for analytical purposes to improve our services.
        </p>
        <h2>Disclosure of Your Information</h2>
        <p>
          We may disclose your personal information to third parties, such as service providers, to help us operate and improve our services. We do not sell your personal information to third parties for marketing purposes.
        </p>
        <Button appearance="primary" onClick={handleGoBack}>
          Go Back
        </Button>
      </Pane>
    </Pane>
  );
};

export default PrivacyPage;
