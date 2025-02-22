from flask import Flask, request # type: ignore
import serial # type: ignore
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Initialize serial connection
ser = serial.Serial('COM3', 9600)  # Change 'COM3' to your Arduino's serial port

@app.route('/translate', methods=['POST'])
def translate_message():
    form_data = dict(request.form)
    print("Form data as dictionary:", form_data)
    if 'message' in request.form:
        message = request.form['message']
        print(message)
        ser.write(message.encode())  # Send message to Arduino over serial
        return 'Message sent to Arduino: ' + message
    else:
        return 'Error: No message provided'

if __name__ == '__main__':
    app.run(debug=False)