from flask import Flask, render_template, redirect, url_for
from flask_pymongo import PyMongo
import scrape_quakes

# Create an instance of Flask
app = Flask(__name__)

## Use flask_pymongo to set up mongo connection
#app.config["MONGO_URI"] = "mongodb://localhost:27017/mars_app"
#mongo = PyMongo(app)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/mars_app")


# Route to render news1.html template using data from Mongo
@app.route("/")
def home():
    # Return template and data
    return render_template("index.html")

@app.route("/aboutr")
def aboutr():
    return render_template("about.html")

@app.route("/news2r")
def news2r():

    mission_data = mongo.db.collection.find_one()

    # Return template and data
    if mission_data:
        print("!!!")
        return render_template("news2r.html", trek=mission_data)
    else:
        return redirect("/scrape")

    # return render_template("news2.html")

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


@app.route("/news1")

def news1():
    # Find one record of data from the mongo database
    mission_data = mongo.db.collection.find_one()

    # Return template and data
    if mission_data:
        print("!!!")
        return render_template("news1.html", trek=mission_data)
    else:
        return redirect("/scrape")


    #  return render_template("news1.html")
    # Find one record of data from the mongo database
    #mission_data = mongo.db.collection.find_one()
    #if mission_data: 
    #return app.send_static_file("templates/news1.html")
    #else:
        #return redirect("/scrape")



# Route that will trigger the scrape function
@app.route("/scrape")
def scrape():

    # Run the scrape function
    mars_data = scrape_quakes.scrape_info()

    # Update the Mongo database using update and upsert=True
    mongo.db.collection.update({}, mars_data, upsert=True)

    # Redirect back to home page
    return redirect("/news1")


if __name__ == "__main__":
    app.run()
