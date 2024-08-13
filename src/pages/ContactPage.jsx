import React from "react";

function ContactPage() {
  return (
    <div className="hero flex items-center justify-center bg-transparent min-h-[85vh]">
      <div className="hero-content flex-col h-full pb-0 md:pb-16 lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Write something..."
                required
                rows="6"
                ></textarea>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
        <div className="text-center pt-7 px-16 lg:p-0 lg:text-left">
          <h1 className="lg:text-5xl text-4xl font-bold">Contact Us!</h1>
          <p className="lg:py-6 pt-3 pb-7">
            We’re here to help you with any questions, concerns, or feedback you
            may have about our Healthcare Chatbot. Your satisfaction and
            well-being are our top priorities. Reach out to us through any of
            the following methods, and our dedicated support team will be happy
            to assist you.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
