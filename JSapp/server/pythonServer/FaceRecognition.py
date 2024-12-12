import cv2
import face_recognition
import os

def load_face_encodings_from_folder(folder_path):
    encodings = []
    # Loop through all files in the specified folder
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        # Check if the file is a valid image
        try:
            # Load the image and get its encoding
            image = face_recognition.load_image_file(file_path)
            face_encodings = face_recognition.face_encodings(image)
            if face_encodings:  # Ensure at least one face encoding is found
                encodings.append(face_encodings[0])
            else:
                print(f"No face found in {filename}. Skipping...")
        except Exception as e:
            print(f"Error processing {filename}: {e}")
    
    return encodings

def recognize_faces(folder_path):
    # Load encodings from the specified folder
    known_encodings = load_face_encodings_from_folder(folder_path)
    
    # Initialize the webcam
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("Error: Could not open webcam.")
        return

    match_found = False  # Variable to track if a match is found

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: Could not read frame from webcam.")
            break
        
        # Convert the frame from BGR to RGB
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Get face encodings from the captured frame
        frame_encodings = face_recognition.face_encodings(rgb_frame)

        # Draw rectangles around any faces found in the frame
        face_locations = face_recognition.face_locations(rgb_frame)

        for (top, right, bottom, left), face_encoding in zip(face_locations, frame_encodings):
            # Compare with known encodings
            matches = face_recognition.compare_faces(known_encodings, face_encoding)

            # Draw a box around the face
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)

            # Check if there's a match
            if True in matches:
                match_found = True  # Set match found to True
                cv2.putText(frame, "Match found!", (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0, 255, 0), 2)
                break  # Exit the loop since we found a match

        # Display the resulting frame
        cv2.imshow("Webcam - Press 'q' to quit", frame)

        # If a match was found, break the loop
        if match_found:
            break

        # Exit on pressing 'q'
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release the webcam and close windows
    cap.release()
    cv2.destroyAllWindows()

    # Print the result based on whether a match was found
    print(match_found)

# Usage
folder_path = r'C:\Users\kaush\Documents\intelAlpha\documentVerification\JSapp\server\pythonServer\sampleimages\sanjana'
recognize_faces(folder_path)
