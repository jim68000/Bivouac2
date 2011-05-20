var t = ["blah", "<html>"
, "	<head>"
, "		<title>Beer</title>"
, "	</head>"
, "	<body>"
, ""
, {"if": "x=y"
, "content": "contents go here"
, "nestedif": {"if": "nested "
, "content": "this is a nested if"
, "nestedif": {"if": "really=nested"
, "content": "super nestation"
}}}, ""
, "afterwards"
, ""
, "</body>"
, "</html>"
];


console.log(t);

var fs = require('fs');

fs.