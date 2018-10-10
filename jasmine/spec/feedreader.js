$(
  (function() {
    /*start first test suite*/
    describe("RSS Feeds", function() {
      /* tests the allFeeds variables has been defined, and that it is not empty */
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });
      /*test each feed in the allFeeds object has a URL defined, and the URL is not empty*/
      it("feeds have defined URL", function() {
        for (var i in allFeeds) {
          expect(allFeeds[i].url).toBeDefined();
          expect(allFeeds[i].url.length).not.toBe(0);
        }
      });
      /*test each feed in the allFeeds object has a name defined, and that the name is not empty*/
      it("feeds have defined name", function() {
        for (var i in allFeeds) {
          expect(allFeeds[i].name).toBeDefined();
          expect(allFeeds[i].name.length).not.toBe(0);
        }
      });
    });

    /*start second test suite*/
    describe("The menu", function() {
      /*test that menu element is hidden by default*/
      var defaultHidden = $("body").hasClass("menu-hidden");
      it("default hidden menu", function() {
        expect(defaultHidden).toBe(true);
      });
      /*test the menu changes visibility when the menu icon is clicked*/
      it("menu visibilty toggle", function() {
        var icon = $(".menu-icon-link");

        icon.click();
        expect($("body").hasClass("menu-hidden")).toBe(false);

        icon.click();
        expect($("body").hasClass("menu-hidden")).toBe(true);
      });
    });

    /*start third test suite*/
    describe("Initial Entries", function() {
      /*test "asynchronous request" ensures when the loadFeed function is called and completes its work, and there is at least 1 entry */
      beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        });
      });
      it("there is at least 1 entry", function() {
        var feedEntry = $('.feed').find('.entry');
        expect(feedEntry.length).toBeGreaterThan(0);
      });
    });
    /*start fourth test suite*/
    describe("New Feed Selection", function() {
      /*test "asynchronous request" to ensures when a new feed is loaded the content actually changes*/
      var firstElement;
      var secondElement;

      beforeEach(function(done) {
        loadFeed(0, function() {
          firstElement = $(".feed").html();
          loadFeed(1, function() {
            done();
          });
        });
      });

      afterEach(function() {
        loadFeed(0);
      });

      it("content changed", function() {
        secondElement = $(".feed").html();
        expect(firstElement).not.toBe(secondElement);
      });
    });
  })()
);
