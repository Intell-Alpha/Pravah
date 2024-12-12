"""
Install the Google AI Python SDK

$ pip install google-generativeai
"""

import os
import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold


class Gemini_Model:
    def __init__(self) -> None:
      # kaushal api: AIzaSyDBNCN6BnCmRkTgDZU7xmxWxkX4hZNVG6Q
      # 4d api: AIzaSyBld0XZZxlF9k4VBs7-0amTzx-pJhOuwDk
      genai.configure(api_key="AIzaSyBld0XZZxlF9k4VBs7-0amTzx-pJhOuwDk")

      # Create the model
      self.generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 64,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
      }


      self.model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=self.generation_config,
        # safety_settings = Adjust safety settings
        # See https://ai.google.dev/gemini-api/docs/safety-settings
      )

    def getValidation(self, category,application, verification):
      print("in the gemini validation: check category:: ", category)
      prompt = f'''

      you are my text validator to check whether all the information in application is present in verification text.
      The application text is: {application}
      The verification text is: {verification}
      verify the documents under the person's {category} category
      give the output in the below format:
      [score, comments]
      score represents the consistency score between 1-100
      comments represents the validation comments between 10-15 words

    '''
      prompt1 = f'''
      check whether the {category}  information given in application: [{application}] is present in verification document texts: [{verification}] and return a consistency score (1-100) which gives what percent of application text matches with verification and give the summary of validation in less than 50 words.
      NOTE:
      - score is the percentage of application text present in the verification text.
      - summary should **only** discuss the presence or absence of details from the application text, without referencing anything that is exclusive to the verification text.
      '''
      prompt_final = "what is the capital of india?"
      try:
        response = self.model.generate_content([prompt1], safety_settings={
          HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
          HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
          HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
          HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
          
        })
      except Exception as e:
         print(e)
      print("checking for response...")
      print(response)
      return response.text
