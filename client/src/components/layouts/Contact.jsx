import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { store } from "react-notifications-component";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    document.title = "Contact Us";
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, phone, message })
    });
    const data = await response.json();

    if (data.success) {
      store.addNotification({
        title: "Success",
        message: "Your Message was sent successfully",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          pauseOnHover: true
        }
      });
      setRedirect(true);
    }
  };

  if (redirect) return <Redirect to="/" />;

  return (
    <main className="container mt-5 px-2 py-5">
      <h2 className="text-primary h1 my-5">Contact Us Now </h2>
      <h4 className="text-dark mb-5">
        If you have any question or problem drop us a message so we can help you
        as quickly as possible
      </h4>
      <form className="row justify-content-around px-3" onSubmit={handleSubmit}>
        <div className="form-group col-md-6" data-aos="fade-right">
          <label>
            Email <span className="text-primary">*</span> :
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="eg.ahmad1999@gmail.com"
          />
        </div>
        <div className="form-group col-md-6" data-aos="fade-left">
          <label>Mobile Phone </label>
          <input
            type="text"
            className="form-control"
            name="phone"
            placeholder="eg.+977 967635310"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group col-md-12" data-aos="fade-right">
          <label>
            Message <span className="text-primary">*</span> :
          </label>
          <textarea
            type="text"
            className="form-control"
            name="message"
            required
            rows="5"
            style={{ resize: "none" }}
            placeholder="eg.Hello there , I would like to ask you about ...."
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg ml-auto mr-4"
          data-aos="zoom-in"
          data-aos-duration="300"
          data-aos-delay="600"
          data-aos-offet="0"
        >
          Send Message{" "}
        </button>
      </form>
    </main>
  );
};

export default Contact;
