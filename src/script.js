const colors = [
  "#3498db",
  "#9b59b6",
  "#e67e22",
  "#34495e",
  "#1abc9c",
  "#c0392b",
  "#f1c40f",
  "#2980b9",
  "#d35400",
  "#8e44ad",
  "#2ecc71",
  "#f39c12"
];

let quotes = [];

$(document).ready(function() {
  getQuotes().then(function() {
    // Assign initial color on load
    changeColor();
    // Assign initial quote on load
    getNewQuote();
  });

  // Change colors on click
  $(".submit-button").click(function() {
    changeColor();
  });
});

function changeColor() {
  const color = colors[Math.floor(Math.random() * colors.length)];
  $(".click").css("backgroundColor", color);
  $("html, body").css("backgroundColor", color);
  $("html, body").css("color", color);
}

function getQuotes() {
  return $.ajax({
    headers: {
      Accept: "application/json"
    },
    url: "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
    success: function(data) {
      let response = JSON.parse(data);
      quotes = response.quotes;
    }
  });
}
function getNewQuote() {
  const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
  $("#quote-text").animate({ opacity: 0 }, 550, function() {
    $("#text").text(newQuote.quote);
    $("#quote-text").animate({ opacity: 1 }, 550);
  });
   $("#authors-div").animate({ opacity: 0 }, 500, function() {
    $("#author").text(newQuote.author); // Set the author
    $("#authors-div").animate({ opacity: 1 }, 550);
  });
  share(newQuote);
}
function share(quote) {
  $("#tweet-quote").attr(
    "href",
    "https://twitter.com/intent/tweet?hashtags=quotes&related=quotes&text=" +
      encodeURIComponent('Quote of the day: ' + quote.quote + '-' + quote.author)
  );

  $("#tumblr-quote").attr(
    "href",
    "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=" +
      encodeURIComponent(quote.author) +
      "&content=" +
      encodeURIComponent(quote.quote) +
      "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
  );
}
function Quote(){
    changeColor();
    getNewQuote();
}
$("#new-quote").on("click", Quote);
