import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../styles/form.css";
import { nanoid } from "nanoid";

let my_id = nanoid();
console.log(my_id);

const defaultValues = {
  id: nanoid(),
  name: "",
  email: "",
  subject: "",
  message: "",
};
function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({ defaultValues });
  const [success, setSuccess] = useState("");
  const [failure, setFailure] = useState(false);

  async function submission(data) {
    let new_data = { ...data, id: nanoid() };
    const response = await axios.post(
      "https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries",
      new_data
    );
    console.log(response.data);

    console.log(new_data);
  }

  //check if submission was successful (best practice,not in the submission() because asynchronuosly,
  //response may delay and u already) fired setSucess and setFailure

  useEffect(() => {
    if (isSubmitSuccessful) {
      setSuccess(true);
      setFailure(false); //update errorstate to false
      reset();
    }
  }, [reset, isSubmitSuccessful]);

  //check for error after submission
  function onSubmitError() {
    setSuccess(false);
    setFailure(true);
  }
  return (
    <form className="form" onSubmit={handleSubmit(submission, onSubmitError)}>
      <p>
        {success
          ? "Submitted sucessfully ✅ "
          : failure
          ? "Submission not successful ❌"
          : ""}
      </p>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <div className="form-group_input">
          <input
            className="inputfield"
            id="name"
            type="text"
            placeholder="enter your name"
            {...register("name", {
              required: "Enter your name",
              minLength: {
                value: 3,
                message: "Name should be atleast 3 letters",
              },
            })}
          />
          <p className="errormessage">
            {errors.name ? errors.name.message : ""}
          </p>
        </div>
      </div>
      {/* EMAIL */}
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <div className="form-group_input">
          <input
            className="inputfield"
            id="email"
            type="email"
            placeholder="example@email.com"
            {...register("email", {
              required: "Enter your email address",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email should be in the correct format",
              },
            })}
          />
          <p className="errormessage">
            {errors.email ? errors.email.message : ""}
          </p>
        </div>
      </div>
      {/* SUBJECT */}
      <div className="form-group">
        <label for="selectInput">Track:</label>
        <div className="form-group_input">
          <select
            id="selectInput"
            name="selectInput"
            {...register("subject", { required: "Choose a track" })}
          >
            <option value="option1">Frontend development</option>
            <option value="option2">Backend development</option>
            <option value="option3">Full-stack development</option>
          </select>
          <p className="errormessage">
            {errors.subject ? errors.subject.message : ""}
          </p>
        </div>
      </div>
      {/* TEXTAREA */}
      <div className="form-group">
        <label for="message">Message:</label>
        <div className="form-group_input">
          <textarea
            id="message"
            name="message"
            rows="9"
            {...register("message", { required: "kindly write us a message" })}
          ></textarea>
          <p className="errormessage">
            {errors.message ? errors.message.message : ""}
          </p>
        </div>
      </div>
      {/* SUBMIT BUUTTON */}
      <button type="submit">
        {isSubmitting ? <p className="load-spinner"></p> : "Submit"}
      </button>
    </form>
  );
}

export default Form;
