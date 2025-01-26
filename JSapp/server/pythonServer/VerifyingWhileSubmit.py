from flask import Flask, request, jsonify
from PIL import Image
import pytesseract
import requests
from dotenv import load_dotenv
from io import BytesIO
from flask_cors import CORS
import os
import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold
import re

load_dotenv()
app = Flask(__name__)
CORS(app)
# Configure your Gemini Flash 1.5 API endpoint and key (replace with actual values)
GEMINI_API_URL = "https://api.gemini-flash.com/v1/compare"
API_KEY = os.getenv("GENAI_API_KEY")

def extract_text_from_image(image_url):
    response = requests.get(image_url)
    image = Image.open(BytesIO(response.content))
    text = pytesseract.image_to_string(image)
    print(text)
    return text

def compare_with_gemini(user_text, extracted_text):
    genai.configure(api_key=os.getenv("GENAI_API_KEY"))
    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 64,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
      }
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config= generation_config,
        # safety_settings = Adjust safety settings
        # See https://ai.google.dev/gemini-api/docs/safety-settings
      )
    prompt1 = f"compare whether user text: {user_text} is present in the extracted text: {extracted_text} and return a score (indicating how much of the user text is present in the extracted text 1-100) and a summary of 20-30 words in the format [score, summary]"
    try:
        response = model.generate_content([prompt1], safety_settings={
          HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
          HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
          HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
          HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
        })
        return response.text
    except Exception as e:
        print(e)


def extract_score_and_summary(text):
    pattern = r'\[(\d+),\s*(.*)\]'
    match = re.search(pattern, text)

    if match:
        score = int(match.group(1))
        summary = match.group(2).strip()
        return [score, summary]
    else:
        raise ValueError("The input text does not match the expected format.")

@app.route('/submit', methods=['POST'])
def handle_submit():
    data = request.json
    print(data)
    full_address = data.get('fullText')
    proof_link = data.get('proofLink')

    # Step 1: Extract text from the proof image
    extracted_text = extract_text_from_image(proof_link)

    # Step 2: Use Gemini Flash API to compare texts
    gemini_result = compare_with_gemini(full_address, extracted_text)


    result = extract_score_and_summary(gemini_result)
    print(result)

    return jsonify({"score": result[0], "summary": result[1]})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
