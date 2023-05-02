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
    let new_data = { ...data, id: nanoid()};
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
        <label htmlFor="name">NAME</label>
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
      {/* SUBMIT BUUTTON */}
      <button type="submit">{isSubmitting ? "Submitting..." : "Submit"}</button>
    </form>
  );
}

export default Form;
