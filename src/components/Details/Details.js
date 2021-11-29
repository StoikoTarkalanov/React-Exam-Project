/* eslint-disable jsx-a11y/img-redundant-alt */
import Mercedes from '../images/Mercedes 190 SL.jpg';

const Details = () => {
  return (
    <article className="cars-card">
      <h1 className="cars-card-title">Car Heading In Details</h1>
      <article className="cars-card-image">
        <img src={Mercedes} alt="Image..." />
      </article>
      <p className="cars-card-content">
        Text messages are used for personal, family, business and social
        purposes. Governmental and non-governmental organizations use text
        messaging for communication between colleagues. In the 2010s, the
        sending of short informal messages became an accepted part of many
        cultures, as happened earlier with emailing.[1] This makes texting a
        quick and easy way to communicate with friends, family and colleagues,
        including in contexts where a call would be impolite or inappropriate
        (e.g., calling very late at night or when one knows the other person is
        busy with family or work activities). Like e-mail and voicemail and
        unlike calls (in which the caller hopes to speak directly with the
        recipient), texting does not require the caller and recipient to both be
        free at the same moment; this permits communication even between busy
        individuals. Text messages can also be used to interact with automated
        systems, for example, to order products or services from e-commerce
        websites, or to participate in online contests. Advertisers and service
        providers use direct text marketing to send messages to mobile users
        about promotions, payment due dates, and other notifications instead of
        using postal mail, email, or voicemail.
      </p>
    </article>
  );
};

export default Details;
