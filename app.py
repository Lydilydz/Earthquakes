from flask import Flask, render_template, redirect, url_for

# Create an instance of Flask
app = Flask(__name__)

# Route to render news1.html template using data from Mongo
@app.route("/")
def home():
    # Return template and data
    return render_template("index.html")

@app.route("/aboutr")
def aboutr():
    return render_template("about.html")

@app.route("/news1")
def news1():
    return render_template("news1.html")

@app.route("/news2r")
def news2r():
    return render_template("news2.html")

@app.route("/new3r")
def news3r():
    return render_template("news3.html")

@app.route("/new4r")
def news4r():
    return render_template("news4.html")

@app.route("/data1")
def data1():
    return render_template("data.html")

@app.route("/maps1")
def maps1():
    return render_template("maps.html")

@app.route("/pics1")
def pics1():
    return render_template("pics.html")

if __name__ == "__main__":
    app.run()
