import { useState } from 'react';

const SubscriptionForm = () => {
  const [subscriptionData, setSubscriptionData] = useState({ email: '', name: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const response = await client.lists.addListMember('list_id', {
    //   email_address: 'Ebony_Brekke@gmail.com',
    //   status: 'pending',
    // });
    // console.log(response);

    console.log('Form submitted');
  };

  console.log(subscriptionData);

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
        <input type="email" value={subscriptionData.email} id="email" name="Email" />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
};

export default SubscriptionForm;
