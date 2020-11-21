import Link from "next/link";
import ContactForm from "../components/form/ContactForm";

const Contact = () => {
  return (
    <div className='container pt-5'>
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <h2>联系</h2>
          <hr />
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
