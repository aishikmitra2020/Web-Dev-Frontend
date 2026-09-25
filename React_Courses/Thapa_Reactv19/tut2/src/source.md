## Inport and Export

1.  Default Export: A file can have only one default export.
    Default Import: When importing a default export, you can name the import whatever you like.

2.  Named Export:
    A file can have multiple named exports.
    Each named export must be explicitely exported.

    Destructuring during importing named exports is mandatory because JavaScript modules export named values as properties of an object. The curly braces {} allow us to extract only the specific properties we need from that object.

    Named Import:
    When importing named exports, the import names much watch the export names exactly.
    Named imports must be enclosed in curly braces {} means they must be destructured.

3.  Combined Import & Export
