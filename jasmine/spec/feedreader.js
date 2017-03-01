/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
 /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
 describe('RSS Feeds', function() {
  /* This is our first test - it tests to make sure that the
   * allFeeds variable has been defined and that it is not
   * empty. Experiment with this before you get started on
   * the rest of this project. What happens when you change
   * allFeeds in app.js to be an empty array and refresh the
   * page?
   */
  it('are defined', function() {
   expect(allFeeds).toBeDefined();
   expect(allFeeds.length).not.toBe(0);
  });
  /* This is our second test - this test loops through each feed in the allFeeds 
   * object and ensures it has a URL defined and that the URL is not empty 
   */
  it('have a url which is not empty', function() {
   for (var i = 0; i < allFeeds.length; i++) {
    expect(allFeeds[i].url).toBeDefined(); //check for URL to be defned
    expect(allFeeds[i].url.length).not.toEqual(0); //checking for the URL to be non empty
   }
  });

  /* This is our third test - this test loops through each feed in the allFeeds 
   * object and ensures it has a name defined and that the name is not empty 
   */
  it('have name which is not empty', function() {
   for (var i = 0; i < allFeeds.length; i++) {
    expect(allFeeds[i].name).toBeDefined(); //check for name to be defined
    expect(allFeeds[i].name).not.toEqual(''); //Checking for the name to be non empty

   }
  });
 });
 /* This test suit is about The menu */
 describe('The menu', function() {
  /* This is the fourth test and ensures that the menu element is hidden by default */
  it('class is hidden', function() {
   expect($('body').hasClass('menu-hidden')).toBeTruthy();
  });

  /* This is the fifth test and ensures that the menu toggles visibility on click
   */
  it('changes visibility on click', function() {

   $('a.menu-icon-link').click();
   expect($('body').hasClass('menu-hidden')).not.toBeTruthy(); //Checks that on click, the menu becomes visible
   $('a.menu-icon-link').click();
   expect($('body').hasClass('menu-hidden')).toBeTruthy(); //checks that on click again the meu becomes invisible again
  });
 });
 /* Test suit about "Initial Entries" */
 describe('Initial Entries', function() {
  /* A test that ensures when the loadFeed
   * function is called and completes its work, there is at least
   * a single .entry element within the .feed container.
   * loadFeed() is asynchronous so this test 
   * uses Jasmine's beforeEach and asynchronous done() function.
   */
  beforeEach(function(done) {
   loadFeed(0, function() {
    done();
   });
  });

  //  var element=$('.entry');
  //($('.feed')).toContain(element);
  it('contain at least a single .entry element within the .feed container', function(done) {
   //we have passed done to function here to make sure specs are run after the page has been loded
   var lengthOfElement = $('.feed .entry').length;
   expect(lengthOfElement).toBeGreaterThan(0);
   done();
  });
 });
 /* A new test suite about"New Feed Selection" */
 /*  A ensures when a new feed is loaded
  * by the loadFeed function that the content actually changes.
  *  loadFeed() is asynchronous.
  */
 describe('New Feed Selection', function() {

  beforeEach(function(done) {

   loadFeed(0, function() {
    done();
   });
  });

  it('contains a new feed when a new feed is loaded', function(done) {
   for (var i = 1; i < allFeeds.length; i++) {

    expect(allFeeds[i - 1].url).not.toEqual(allFeeds[i].url); //To ensure that the content of new feed is not as that of previous one
   }
   done();
  });
 });
}());
