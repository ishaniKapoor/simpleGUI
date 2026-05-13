import requests
import streamlit as st

API_URL = "http://127.0.0.1:8000/convert"

st.title("Unit Converter")
st.write("A simple client/server unit converter")

conversion_options = {
    "Miles to Kilometers": ("miles", "kilometers"),
    "Kilometers to Miles": ("kilometers", "miles"),
    "Pounds to Kilograms": ("pounds", "kilograms"),
    "Kilograms to Pounds": ("kilograms", "pounds"),
    "Fahrenheit to Celsius": ("fahrenheit", "celsius"),
    "Celsius to Fahrenheit": ("celsius", "fahrenheit"),
}

selected_conversion = st.selectbox("Choose a conversion", list(conversion_options.keys()))
value = st.number_input("Enter a value", value=1.0)

if st.button("Convert"):
    from_unit, to_unit = conversion_options[selected_conversion]

    payload = {
        "value": value,
        "from_unit": from_unit,
        "to_unit": to_unit
    }

    try:
        response = requests.post(API_URL, json=payload)
        response.raise_for_status()

        data = response.json()

        st.success(
            f"{data['input_value']} {data['from_unit']} = "
            f"{data['result']} {data['to_unit']}"
        )
    except requests.exceptions.RequestException as error:
        st.error(f"Could not connect to the server: {error}")
