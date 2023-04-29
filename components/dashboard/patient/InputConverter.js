export default function InputConverter(data, algo) {
  let gender = data.gender == "Male" ? 0 : 1;
  let ethnicity =
    data.ethnicity == "Malay" ? 0 : data.ethnicity == "Chinese" ? 1 : 2;
  let religion =
    data.religion == "Islam"
      ? 0
      : data.religion == "Buddhist"
      ? 1
      : data.religion == "Christian"
      ? 2
      : 3;
  let marital_status =
    data.marital_status == "Married"
      ? 0
      : data.marital_status == "Single"
      ? 1
      : 2;
  let employment = data.employment == "Unemployed" ? 0 : 1;

  if (data) {
    data = {
      Age: data.age,
      Gender: gender,
      Ethnicity: ethnicity,
      Religion: religion,
      Marital_Status: marital_status,
      Employment: employment,
      Little_Interest: data.phq9.little_interest - 1,
      Feeling_Down: data.phq9.feeling_down - 1,
      Sleeping_Trouble: data.phq9.sleeping_trouble - 1,
      Feeling_Tired: data.phq9.feeling_tired - 1,
      Poor_Appetite: data.phq9.poor_appetite - 1,
      Feeling_Bad: data.phq9.feeling_bad - 1,
      Trouble_Concentrating: data.phq9.trouble_concentrating - 1,
      Moving_Slowly: data.phq9.moving_slowly - 1,
      Thoughts_self_harm: data.phq9.thoughts_self_harm - 1,
      Has_Depressive_Disorder: data.has_depressive_disorder,
      Past_Psychiatric_Disorder: data.past_psychiatric_disorder,
      Past_Suicidal_Attempt: data.past_suicidal_attempt,
      Medical_Comorbidity: data.medical_comorbidity,
      Algo: algo,
    };
  }

  return data;
}
