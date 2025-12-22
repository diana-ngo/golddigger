Background:
- Gold Digger is a widget that keeps you informed of current market prices and allows you to buy gold at the click of a button.

Problem:
- When the app is offline, we get this red circle that says "disconnected".
- When the app goes online, we get a green circle that says "live prices", and we see a live price. 
- Every few seconds, the live price automatically updates.
- The user can enter an amount to invest.
- When the user clicks "Invest Now", they get a confirmation of the purchase. And when they click "Okay", the app is ready for them to make another purchase.

Back end:
- Serves static files (HTML, CSS, and JavaScript).
- Updates the front end with live prices every 2-3 seconds.
- When a user makes a purchase, it is logged to a text file on the server. Each logged purchase has a timestamp, an amount paid, a price per ounce, and an amount of gold sold (the precise format is up to you).
- To get live gold prices, you could:
  1. You could use an API, but APIs are slow to update, with the best ones updating about every 15 min.
  2. Write an algorithm which supplies a realistic looking price on demand and is generated at random.

Front end:
- HTML and CSS is given, but you must write the JavaScript yourself.


Stretch goals:
- Generate a PDF with the transaction details (there's an npm package to do this)
- Email a response confirming the purchase (there are npm packages that mock this process)

Concepts You Will Use:
- HTTP, FS, events, and path modules
- Routing
- Serving static files and data
- Event emitters
- Server-sent events