import { useState } from 'react';
// import mailchimp from '@mailchimp/mailchimp_marketing';

// mailchimp.setConfig({
//   apiKey: import.meta.env.PUBLIC_MAILCHIMP_API_KEY,
//   server: import.meta.env.PUBLIC_MAILCHIMP_SERVER_PREFIX,
// });

const SubscriptionForm = () => {
  const [subscriptionData, setSubscriptionData] = useState({ email: '', name: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = new FormData();
    contactData.append('name', subscriptionData.name);
    contactData.append('email', subscriptionData.email);

    const response = await fetch(`/api/mailchimp`, {
      method: `POST`,
      body: contactData,
    });
  };

  return (
    <div>
      <h2>Subscribe to our newsletter</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          value={subscriptionData.name}
          id="name"
          name="name"
          onChange={(e) => setSubscriptionData((prev) => ({ ...prev, name: e.target.value }))}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          value={subscriptionData.email}
          id="email"
          name="Email"
          onChange={(e) => setSubscriptionData((prev) => ({ ...prev, email: e.target.value }))}
        />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
};

export default SubscriptionForm;
