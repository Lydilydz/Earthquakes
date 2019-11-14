from bs4 import BeautifulSoup as bs
from splinter import Browser
import time
import pandas as pd
#import numpy


def init_browser():
    # @NOTE: Path to my chromedriver
    executable_path = {"executable_path": r"chromedriver"}
    return Browser("chrome", **executable_path, headless=False)


def scrape_info():
    browser = init_browser()

    ###QUAKE NEWS
    # Visit the following URL
    url = "https://www.indiatoday.in/earthquake-indiatoday?view_type=list"
    browser.visit(url)
    time.sleep(2)
    xpath = '//*[@id="content"]/div[3]/div[1]/div[1]/div[2]/h2/a'
    # xpath for image
    results = browser.find_by_xpath(xpath)
    img = results[0]
    img.click()
    time.sleep(3)


    # Scrape page into Soup
    html = browser.html
    soup = bs(html, "html.parser")

    # Get latest NASA Mars news title and teaser
    #news_title = soup.find('div', class_='content_title').text
    #news_p = soup.find('div', class_="article_teaser_body").text


    news_title_section = soup.find('div', class_='node node-story view-mode-full')
    news_title = news_title_section.find('h1', itemprop="headline").text

    time.sleep(2)
    news_p = soup.find('div', class_="story-kicker").text



    img_desc = soup.find('div', class_="stryimg")
    image = img_desc.find('img')
    featured_image_url = image['src']
    featured_img_title = image['alt']


    
 
    ###JPL Mars Space Images - FEATURED IMAGE
    # Visit the following URL
    # url = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"
    # jpl = "https://www.jpl.nasa.gov"
    # browser.visit(url)
    # time.sleep(3)

    # # xpath for image
    # xpath = '//*[@id="full_image"]'

    # # Use splinter to Click the image to bring up the full resolution image
    # results = browser.find_by_xpath(xpath)
    # img = results[0]
    # img.click()
    # time.sleep(3)
    # # Scrape page into Soup
    # html = browser.html
    # soup = bs(html, "html.parser")

    # img_desc = soup.find('div', class_="fancybox-inner fancybox-skin fancybox-dark-skin fancybox-dark-skin-open")
    # image = img_desc.find('img')
    # image['src']
    
    # title_fea = soup.find('article')
    # featured_img_title = title_fea['alt']
    # featured_image_url = jpl + image['src']
    
    
    # ### MARS WEATHER
    # # Visit the following URL
    # url = "https://twitter.com/marswxreport?lang=en"
    # browser.visit(url)
    # time.sleep(2)
    # # Scrape page into Soup
    # html = browser.html
    # soup = bs(html, "html.parser")
    # tweet = soup.find_all('p', class_="TweetTextSize TweetTextSize--normal js-tweet-text tweet-text")
    # z=0
    # for x in tweet:
    #     if tweet[z].text.split(' ', 1)[0] == 'InSight':
    #         mars_weather = tweet[z].text #_Mars weather
    #         break
    #     else:
    #         z+=1
    # # Scrapes for Mars weather
    
    # ### MARS FACTS
    # # Visit the following URL
    # url = r"https://space-facts.com/mars/"
    # browser.visit(url)

    # tables = pd.read_html(url)
    # df = tables[1]
    # df.columns = [' ', 'Value']
    # html_table = df.to_html(table_id="html_tbl_css",justify='left',index=False)
    
    
    #### MARS HEMISPHERES
    # Visit the following URL
#    url = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
#     url = "https://astrogeology.usgs.gov/maps/mars-viking-hemisphere-point-perspectives"    
#     browser.visit(url)
#     time.sleep(2)    
    
#     img_list =[]
#     img_url_list = []
#     title_list = []
#     hemi=2
#     count=1
#     x=0
#     kiki=[]

# #    url = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
#     url = "https://astrogeology.usgs.gov/maps/mars-viking-hemisphere-point-perspectives"    
# #    xpath = ('//*[@id="product-section"]/div[2]/div[' + str(hemi) +']/div/a/h3')
#     xpath = ('//*[@id="publish"]/div[1]/div[1]/div[4]/div/a[' + str(hemi) +']/div/h3')    
# #              //*[@id="publish"]/div[1]/div[1]/div[4]/div/a[4]/div/h3
# #              //*[@id="publish"]/div[1]/div[1]/div[4]/div/a[6]/div/h3
# #              //*[@id="publish"]/div[1]/div[1]/div[4]/div/a[8]/div/h3
#     while count < 5:
#         browser.visit(url)

#         hemi_name = browser.find_by_xpath(xpath).text
#         title_list.append(hemi_name)
#         results = browser.find_by_xpath(xpath)

#         img = results[0]
#         img.click()
#         time.sleep(2)

#         # Scrape page into Soup
#         html = browser.html
#         soup = bs(html, "html.parser")
#         img_desc = soup.find('div', id="wide-image")
#         img_src = img_desc.find('div',class_='downloads')
#         image = img_src.find('a')
#         if image.has_attr('href'):
#             target_img = image.attrs['href']
#         img_url_list.append(target_img)

#         hemi+=2
# #        xpath = ('//*[@id="product-section"]/div[2]/div[' + str(hemi) +']/div/a/h3')
#         xpath = ('//*[@id="publish"]/div[1]/div[1]/div[4]/div/a[' + str(hemi) +']/div/h3')  
#         count+=1
#         x+=1
    
#     hemisphere_image_urls = []
#     h=0
#     for items in title_list:
#         if h < 4:
#             dict = {"title": title_list[h], "img_url": img_url_list[h]}
#             hemisphere_image_urls.append(dict)
#             h+=1

    # Store data in a dictionary
    mars_data = {
        "news_title": news_title,
        "news_p": news_p,
        "featured_image_url": featured_image_url,
        "featured_img_title": featured_img_title
      #  "mars_weather": mars_weather
       # "html_table":html_table,
       # "hemisphere_image_urls":hemisphere_image_urls
    }

    time.sleep(1)
    # Close the browser after scraping
    browser.quit()

    # Return results
    return mars_data
