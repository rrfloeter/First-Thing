var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
url += '?' + $.param({
   'api-key': "HxpDvETDPgkbpFkLaYEc22sMX43j54pK"
});

$.ajax({
   url: url,
   method: 'GET',
}).done(function (response) {
   console.log(response);

   var articles = 0;

   $.each(response.results, function (i, article) {
      if (article.multimedia.length !== 0 && articles !== 3) {
         console.log(article.multimedia.length);
         // Creating and storing a div tag
         var articleDiv = $("<div>");
         //  adding border and margin
         articleDiv.addClass("col text-left")
         articleDiv.addClass("col text-left m-1")
      
         // Storing the imgURL
         var imgURL = article.multimedia[0].url;
      
         // Creating an element to hold the image
         var image = $("<img>").attr("src", imgURL);
         // adding margin around the image
         image.addClass("m-1")
      
         // Appending the image
         articleDiv.append(image);
      
         // Storing the title data
         var title = article.title;
      
         // Displaying the title and linking it to the article url
         articleDiv.append("<h6 class='d-inline'>" + "<a href='" + article.url + "' target='_blank'>" + title + "</a>" + "</h6>");
      
         // Storing the date data
         var date = article.created_date;
      
         // Displaying the date
         articleDiv.append("<h6>" + moment(date).format("dddd, MMMM Do YYYY, h:mm a") + "</h6>");
      
         // Storing the abstract data
         var abstract = article.abstract;
      
         // Creating an element to hold the abstract
         var pThree = $("<p>").text(abstract);
      
         // Displaying the abstract
         articleDiv.append(pThree);
         articleDiv.append("<hr>");
      
         // Appending the articleDiv to the HTML page in the "#acticle-section" div
         $("#article-section").append(articleDiv);

         articles++;
      }
   })
});
