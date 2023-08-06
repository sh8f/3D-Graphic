// Project 4 - Raymond Do + Si Hong Huang

var canvas, gl;

var eye = [1, 2, 2];
var at = [0, 0, 0];
var up = [0, 1, 0];

var projectionMatrix, projectionMatrixLoc;
var y_max = 4;
var y_min = -4;
var x_max = 6;
var x_min = -6;
var near = -30;
var far = 30;

var sword = 0;
var reset = 1;
var sound = 0;

var pointsArray = [], normalsArray = [];
var texCoord = [];

const audioElement = new Audio('pictures/spin.webm');

var tex = [
        vec2(0, 0),
        vec2(0, 1),
        vec2(1, 1),
        vec2(1, 0),
    ];

var vertices = [
    // blade
    vec4(0, 0, 0, 1),           // A(0)
    vec4(0.5, 0, 0, 1),         // B(1)
    vec4(0.5, 2, 0, 1),         // C(2)
    vec4(0.25, 2.5, 0, 1),      // D(3)
    vec4(0, 2, 0, 1),           // E(4)
    vec4(0, 0, 0.5, 1),         // F(5)
    vec4(0.5, 0, 0.5, 1),       // G(6)
    vec4(0.5, 2, 0.5, 1),       // H(7)
    vec4(0.25, 2.5, 0.5, 1),    // I(8)
    vec4(0, 2, 0.5, 1),         // J(9)

    // hilt
    vec4(-0.15, 0, -0.15, 1),      // A(10)
    vec4(0.65, 0, -0.15, 1),       // B(11)
    vec4(0.65, 0, 0.65, 1),        // C(12)
    vec4(-0.15, 0, 0.65, 1),       // D(13)

    vec4(-0.15, -0.20, -0.15, 1),  // E(14)
    vec4(0.65, -0.20, -0.15, 1),   // F(15)
    vec4(0.65, -0.20, 0.65, 1),    // G(16)
    vec4(-0.15, -0.20, 0.65, 1),   // H(17)

    // handle
    vec4(0.15, -0.20, 0.15, 1),   // A(18)
    vec4(0.45, -0.20, 0.15, 1),   // B(19)
    vec4(0.45, -0.20, 0.45, 1),   // C(20)
    vec4(0.15, -0.20, 0.45, 1),   // D(21)

    vec4(0.15, -1.3, 0.15, 1),    // E(22)
    vec4(0.45, -1.3, 0.15, 1),    // F(23)
    vec4(0.45, -1.3, 0.45, 1),    // G(24)
    vec4(0.15, -1.3, 0.45, 1),    // H(25)

    //base
    vec4(.18, -.5, 0, 1),    // A(26)
    vec4(.82, -.5, 0, 1),    // B(27)
    vec4(.75, 1.2, 0, 1),    // C(28)
    vec4(0.5, 1.5, 0, 1),    // D(29)
    vec4(.25, 1.2, 0, 1),    // E(30)
    vec4(.18, -.5, .5, 1),   // F(31)
    vec4(.82, -.5, .5, 1),   // G(32)
    vec4(.75, 1.2, .5, 1),   // H(33)
    vec4(0.5, 1.5, .1, 1),   // I(34)
    vec4(.25, 1.2, .5, 1),   // J(35)

    //right wing
    vec4(.75, -.1, .20, 1),   // 36
    vec4(.75, -.1, .30, 1),   // 37
    vec4(.75, .9, .20, 1),    // 38
    vec4(.75, .9, .30, 1),    // 39
    vec4(1.45, -.1, .20, 1),  // 40
    vec4(1.45, -.1, .30, 1),  // 41

    //left wing
    vec4(.25, -.1, .20, 1),  // 42
    vec4(.25, -.1, .30, 1),  // 43
    vec4(.25, .9, .20, 1),   // 44
    vec4(.25, .9, .30, 1),   // 45
    vec4(-.45, -.1, .20, 1), // 46
    vec4(-.45, -.1, .30, 1), // 47

    //top
    vec4(.35, 0, .5, 1),    // 48
    vec4(.65, 0, .5, 1),    // 49
    vec4(.35, .8, .5, 1),   // 50
    vec4(.65, .8, .5, 1),   // 51
    vec4(.35, 0, .7, 1),    // 52
    vec4(.65, 0, .7, 1),    // 53
    vec4(.35, .8, .7, 1),   // 54
    vec4(.65, .8, .7, 1),   // 55

    //*******************************************************
    //table top
    vec4(0, 0, 0, 1),     // 56
    vec4(5, 0, 0, 1),     // 57
    vec4(0, .25, 0, 1),   // 58
    vec4(5, .25, 0, 1),   // 59
    vec4(0, 0, 3, 1),     // 60
    vec4(5, 0, 3, 1),     // 61
    vec4(0, .25, 3, 1),   // 62
    vec4(5, .25, 3, 1),   // 63
    //legs
    vec4(0, 0, 0, 1),        // 64
    vec4(.35, 0, 0, 1),      // 65
    vec4(0, -1.5, 0, 1),     // 66
    vec4(.35, -1.5, 0, 1),   // 67
    vec4(0, 0, .35, 1),      // 68
    vec4(.35, 0, .35, 1),    // 69
    vec4(0, -1.5, .35, 1),   // 70
    vec4(.35, -1.5, .35, 1), // 71

    //*******************************************************
    //computer L
    vec4(0.5, .25, .3, 1),  // 72
    vec4(2.5, .25, .3, 1),  // 73
    vec4(0.5, .35, .3, 1),  // 74
    vec4(2.5, .35, .3, 1),  // 75
    vec4(0.5, .25, 2, 1),   // 76
    vec4(2.5, .25, 2, 1),   // 77
    vec4(0.5, .35, 2, 1),   // 78
    vec4(2.5, .35, 2, 1),   // 79

    vec4(0.5, .35, .3, 1),    // 80
    vec4(2.5, .35, .3, 1),    // 81
    vec4(0.5, 1.3, 1.15, 1),  // 82
    vec4(2.5, 1.3, 1.15, 1),  // 83
    vec4(0.5, .35, .5, 1),    // 84
    vec4(2.6, .35, .5, 1),    // 85
    vec4(0.5, 1.3, 1.35, 1),  // 86
    vec4(2.5, 1.3, 1.35, 1),  // 87

    //computer screen
    vec4(0.05, 0.58, 1.9, 1), // 88
    vec4(2.95, 0.58, 1.9, 1), // 89
    vec4(0.05, 1.94, 1.9, 1), // 90
    vec4(2.95, 1.94, 1.9, 1), // 91
    //computer back
    vec4(.25, 1, 1.2, 1),    // 92
    vec4(2.75, 1, 1.2, 1),   // 93
    vec4(.25, 1.5, 1.2, 1),  // 94
    vec4(2.75, 1.5, 1.2, 1), // 95

    //up
    vec4(3, 2, 2, 1),         // 96
    vec4(0, 2, 2, 1),         // 97
    vec4(2.8, 1.75, 1.6, 1),  // 98
    vec4(0.2, 1.75, 1.6, 1),  // 99
    vec4(2.75, 1.5, 1.2, 1),  // 100
    vec4(0.25, 1.5, 1.2, 1),  // 101

    //down
    vec4(3, .5, 2, 1),       // 102
    vec4(0, .5, 2, 1),       // 103
    vec4(2.8, .75, 1.6, 1),  // 104
    vec4(0.2, .75, 1.6, 1),  // 105
    vec4(2.75, 1, 1.2, 1),   // 106
    vec4(0.25, 1, 1.2, 1),   // 107

    //left
    vec4(.25, 1, 1.2, 1),     // 108
    vec4(.25, 1.5, 1.2, 1),   // 109
    vec4(0.2, .75, 1.6, 1),   // 110
    vec4(0.2, 1.75, 1.6, 1),  // 111
    vec4(0, .5, 2, 1),        // 112
    vec4(0, 2, 2, 1),         // 113

    //right
    vec4(2.75, 1, 1.2, 1),   // 114
    vec4(2.75, 1.5, 1.2, 1), // 115
    vec4(2.8, .75, 1.6, 1),  // 116
    vec4(2.8, 1.75, 1.6, 1), // 117
    vec4(3, .5, 2, 1),       // 118
    vec4(3, 2, 2, 1),        // 119
];

// 13 points
var glass = [
    [0.00, 0.000, 0.0], // 1
    [0.80, 0.000, 0.0], // 2
    [0.60, 0.004, 0.0], // 3
    [0.40, 0.004, 0.0], // 4
    [0.20, 0.006, 0.0], // 5
    [0.05, 0.100, 0.0], // 6
    [0.05, 0.200, 0.0], // 7
    [0.05, 0.600, 0.0], // 8
    [0.05, 1.000, 0.0], // 9
    [0.60, 2.000, 0.0], // 10
    [0.55, 2.000, 0.0], // 11
    [0.05, 1.050, 0.0], // 12
    [0.00, 1.025, 0.0], // 13
];

// 11 points
var bottle = [
    [0, 0, 0],
    [1.4, 0, 0],
    [1.2, 1, 0],
    [1.25, 2, 0],
    [1.3, 3, 0],
    [1.6, 4, 0],
    [1.5, 5, 0],
    [1.45, 5.25, 0],
    [.75, 5.25, 0],
    [.75, 6, 0],
    [0, 6, 0],
];

// 10 points
var plantPot = [
    [0, 0, 0],
    [1.5, 0, 0],
    [1.7, .7, 0],
    [1.8, .7, 0],
    [1.9, 1.5, 0],
    [1.95, 1.8, 0],
    [1.85, 1.8, 0],
    [1.6, .7, 0],
    [1.4, .1, 0],
    [0, .1, 0],
];

// 10 points
var pillow = [
    [0, 0, 0],
    [.75, .05, 0],
    [1.5, .1, 0],
    [2.25, 0.1, 0],
    [3, .45, 0],
    [3, 1.55, 0],
    [2.25, 1.85, 0],
    [1.5, 1.9, 0],
    [.75, 1.95, 0],
    [0, 1.975, 0],
];

var lightPosition = vec4(-2, 1, 4, 0.0 );
var lightAmbient = vec4(0.8, 0.8, 0.8, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

var materialAmbient = vec4( 0.85, 0.85, 0.85, 1.0 );
var materialDiffuse = vec4( 0.8, 0.9, 0.9, 1.0);
var materialSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );
var materialShininess = 50.0;

var ctm;
var ambientColor, diffuseColor, specularColor;
var modelView, projection;
var viewerPos;
var program;

var thetaLoc;

// namespace contain all the project information
var AllInfo = {

    // Camera pan control variables.
    zoomFactor : 3.3,
    translateX : -2,
    translateY : 2,

    // Camera rotate control variables.
    phi : 1,
    theta : 0.5,
    radius : 1,
    dr : 2.0 * Math.PI/180.0,

    // Mouse control variables
    mouseDownRight : false,
    mouseDownLeft : false,

    mousePosOnClickX : 0,
    mousePosOnClickY : 0
};

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    DrawSword();
    DrawSShip();
    DrawTable();
    DrawPC();
    DrawRectangle();
    DrawGlass();
    DrawBottle();
    DrawTrashCan();
    DrawPillow();

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW );

    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // texture buffer
    var tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoord), gl.STATIC_DRAW );

    var vTexCoord = gl.getAttribLocation( program, "vTexCoord" );
    gl.vertexAttribPointer( vTexCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( vTexCoord );

    modelView = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

    thetaLoc = gl.getUniformLocation(program, "theta");

    viewerPos = vec3(4.0, 4.0, 4.0 );

    ambientProduct = mult(lightAmbient, materialAmbient);
    diffuseProduct = mult(lightDiffuse, materialDiffuse);
    specularProduct = mult(lightSpecular, materialSpecular);

    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
       flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
       flatten(diffuseProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),
       flatten(specularProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"),
       flatten(lightPosition) );

    gl.uniform1f(gl.getUniformLocation(program,
       "shininess"),materialShininess);

    // Set the scroll wheel to change the zoom factor.
    // wheelDelta returns an integer value indicating the distance that the mouse wheel rolled.
    // Negative values mean the mouse wheel rolled down. The returned value is always a multiple of 120.
    document.getElementById("gl-canvas").addEventListener("wheel", function(e) {
        if (e.wheelDelta > 0) {
            AllInfo.zoomFactor = Math.max(0.1, AllInfo.zoomFactor - 0.1);
        } else {
            AllInfo.zoomFactor += 0.1;
        }
        render();
    });

    //************************************************************************************
    //* When you click a mouse button, set it so that only that button is seen as
    //* pressed in AllInfo. Then set the position. The idea behind this and the mousemove
    //* event handler's functionality is that each update we see how much the mouse moved
    //* and adjust the camera value by that amount.
    //************************************************************************************
    document.getElementById("gl-canvas").addEventListener("mousedown", function(e) {
        if (e.which == 1) {
            AllInfo.mouseDownLeft = true;
            AllInfo.mouseDownRight = false;
            AllInfo.mousePosOnClickY = e.y;
            AllInfo.mousePosOnClickX = e.x;
        } else if (e.which == 3) {
            AllInfo.mouseDownRight = true;
            AllInfo.mouseDownLeft = false;
            AllInfo.mousePosOnClickY = e.y;
            AllInfo.mousePosOnClickX = e.x;
        }
        render();
    });

    document.addEventListener("mouseup", function(e) {
        AllInfo.mouseDownLeft = false;
        AllInfo.mouseDownRight = false;
        render();
    });

    document.addEventListener("mousemove", function(e) {
        if (AllInfo.mouseDownRight) {
            AllInfo.translateX += (e.x - AllInfo.mousePosOnClickX)/30;
            AllInfo.mousePosOnClickX = e.x;

            AllInfo.translateY -= (e.y - AllInfo.mousePosOnClickY)/30;
            AllInfo.mousePosOnClickY = e.y;
        } else if (AllInfo.mouseDownLeft) {
            AllInfo.phi += (e.x - AllInfo.mousePosOnClickX)/100;
            AllInfo.mousePosOnClickX = e.x;

            AllInfo.theta += (e.y - AllInfo.mousePosOnClickY)/100;
            AllInfo.mousePosOnClickY = e.y;
        }
        render();
    });

    window.onkeydown = function(event) {
        var key=String.fromCharCode(event.keyCode);
        switch (key)
        {
            // spins sword and plays audio
            case 'A':
              if (sword == 0 && sound == 0)
              {
                  sword += 1;
                  sound += 1;
                  audioElement.play();
              }
              else if (sword == 1)
              {
                  sword -= 1;
                  sound -= 1;

              }

              break;
            /*case 'B':
              reset = 1;
              break;*/

        }
        render();
    };
    render();
}

function loadTexture(texture, whichTexture)
{
    // Flip the image's y axis
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    // Enable texture unit 1
    gl.activeTexture(whichTexture);

    // bind the texture object to the target
    gl.bindTexture( gl.TEXTURE_2D, texture);

    // set the texture image
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, texture.image );

    // version 1 (combination needed for images that are not powers of 2
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);

    // set the texture parameters
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
};

var angle = 10;
var render = function()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    projectionMatrix = ortho( x_min*AllInfo.zoomFactor - AllInfo.translateX,
                              x_max*AllInfo.zoomFactor - AllInfo.translateX,
                              y_min*AllInfo.zoomFactor - AllInfo.translateY,
                              y_max*AllInfo.zoomFactor - AllInfo.translateY,
                              near, far);
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));

    eye = vec3( AllInfo.radius*Math.cos(AllInfo.phi),
                AllInfo.radius*Math.sin(AllInfo.theta),
                AllInfo.radius*Math.sin(AllInfo.phi));

    // ========  Establish Textures =================
    // --------create texture object 1----------
    texture0 = gl.createTexture();
    texture1 = gl.createTexture();
    texture2 = gl.createTexture();
    texture3 = gl.createTexture();
    texture4 = gl.createTexture();
    texture5 = gl.createTexture();
    texture6 = gl.createTexture();
    texture7 = gl.createTexture();
    texture8 = gl.createTexture();
    texture9 = gl.createTexture();
    texture10 = gl.createTexture();
    texture11 = gl.createTexture();
    texture12 = gl.createTexture();
    texture13 = gl.createTexture();

    // create the image object
    texture0.image = new Image();
    texture1.image = new Image();
    texture2.image = new Image();
    texture3.image = new Image();
    texture4.image = new Image();
    texture5.image = new Image();
    texture6.image = new Image();
    texture7.image = new Image();
    texture8.image = new Image();
    texture9.image = new Image();
    texture10.image = new Image();
    texture11.image = new Image();
    texture12.image = new Image();
    texture13.image = new Image();

    // Tell the broswer to load an image
    texture0.image.src='pictures/metal.jpg'; // spaceship
    texture1.image.src='pictures/wood2.jpg'; // bed frame + table legs
    texture2.image.src='pictures/glass.jpg'; // table top + shelf + sword blade
    texture3.image.src='pictures/bed.jpg'; // bed
    texture4.image.src='pictures/bottle.jpg'; // bottle
    texture5.image.src='pictures/chalice.jpg'; // chalice
    texture6.image.src='pictures/floor.jpg'; // floor
    texture7.image.src='pictures/wall.jpg'; // wall
    texture8.image.src='pictures/black.jpg'; // pc + monitors
    texture9.image.src='pictures/pillow.jpg'; // pillow
    texture10.image.src='pictures/mousepad.jpg'; // mousepad
    texture11.image.src='pictures/rug.jpg'; // rug
    texture12.image.src='pictures/blanket.jpg'; // blanket
    texture13.image.src='pictures/trashcan.jpg'; // trashcan

    // register the event handler to be called on loading an image
    texture0.image.onload = function() {  loadTexture(texture0, gl.TEXTURE0); }
    texture1.image.onload = function() {  loadTexture(texture1, gl.TEXTURE1); }
    texture2.image.onload = function() {  loadTexture(texture2, gl.TEXTURE2); }
    texture3.image.onload = function() {  loadTexture(texture3, gl.TEXTURE3); }
    texture4.image.onload = function() {  loadTexture(texture4, gl.TEXTURE4); }
    texture5.image.onload = function() {  loadTexture(texture5, gl.TEXTURE5); }
    texture6.image.onload = function() {  loadTexture(texture6, gl.TEXTURE6); }
    texture7.image.onload = function() {  loadTexture(texture7, gl.TEXTURE7); }
    texture8.image.onload = function() {  loadTexture(texture8, gl.TEXTURE8); }
    texture9.image.onload = function() {  loadTexture(texture9, gl.TEXTURE9); }
    texture10.image.onload = function() {  loadTexture(texture10, gl.TEXTURE10); }
    texture11.image.onload = function() {  loadTexture(texture11, gl.TEXTURE11); }
    texture12.image.onload = function() {  loadTexture(texture12, gl.TEXTURE12); }
    texture13.image.onload = function() {  loadTexture(texture13, gl.TEXTURE13); }

    // draws our sword
    if (sword == 1)
    {
        angle = angle + 10;
        modelView = lookAt(eye, at, up);
        modelView = mult(modelView, translate(10, 2.5, 0.25));
        modelView = mult(modelView, scale4(1/2, 1/2, 1/2));
        modelView = mult(modelView, rotate(angle, 0.0, 0.0, 1.0));
        gl.uniform1i(gl.getUniformLocation(program, "texture"), 2);
        gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 1);
        gl.uniformMatrix4fv( gl.getUniformLocation(program,
                "modelViewMatrix"), false, flatten(modelView) );

        gl.drawArrays( gl.TRIANGLES, 0, 84 );

        gl.uniform1i(gl.getUniformLocation(program, "texture"), 1);
        gl.drawArrays( gl.TRIANGLES, 84, 36 );

        requestAnimationFrame(render);
    }
    else if (sword == 0)
    {
        modelView = lookAt(eye, at, up);
        modelView = mult(modelView, translate(10, 2.5, 0.25));
        modelView = mult(modelView, scale4(1/2, 1/2, 1/2));
        gl.uniform1i(gl.getUniformLocation(program, "texture"), 2);
        gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 0);
        gl.uniformMatrix4fv( gl.getUniformLocation(program,
                "modelViewMatrix"), false, flatten(modelView) );

        gl.drawArrays( gl.TRIANGLES, 0, 84 );

        gl.uniform1i(gl.getUniformLocation(program, "texture"), 1);
        gl.drawArrays( gl.TRIANGLES, 84, 36 );
    }

    // draws our spaceship
    modelView = lookAt(eye, at, up);
    modelView = mult(modelView, translate(3,2.9,1));
    modelView = mult(modelView, scale4(.5,.6,.5));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 0);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                         , false, flatten(modelView) );

    gl.drawArrays( gl.TRIANGLES, 120, 132 );

    // draws our table
    // table top
    modelView = mat4();
    modelView = lookAt(eye, at, up);
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 2);
    modelView = mult(modelView, translate(-4.5,0,0.25));
    modelView = mult(modelView, scale4(2,1,1.6));
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 0);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                         , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 252, 36 );
    // table legs
    modelView = mat4();
    modelView = lookAt(eye, at, up);
    modelView = mult(modelView, translate(-4,0,0.5));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 1);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 1);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                         , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 288, 36 );
    modelView = mult(modelView, translate(0,0,4));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 1);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 1);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                         , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 288, 36 );
    modelView = mult(modelView, translate(8.8,0,0));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 1);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 1);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                         , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 288, 36 );
    modelView = mult(modelView, translate(0,0,-4));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 1);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 1);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                         , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 288, 36 );

    // draws our monitor
    modelView = mat4();
    modelView = lookAt(eye, at, up);
    modelView = mult(modelView, translate(-2,0,1.5));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 2);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 0);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                         , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 324, 132 );
    // monitor 2
    modelView = mat4();
    modelView = lookAt(eye, at, up);
    modelView = mult(modelView, translate(1,0,1.5));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 2);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 0);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                         , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 324, 132 );

    // draws our floor
    modelView = mat4();
    modelView = lookAt(eye, at, up);
    modelView = mult(modelView, translate(-5,-1.75,0));
    modelView = mult(modelView, scale4(6,1,7));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 6);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 0);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                         , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 456, 36 );

    // draws our wall
    modelView = mat4();
    modelView = lookAt(eye, at, up);
    modelView = mult(modelView, translate(-5,-1.75,0));
    modelView = mult(modelView, scale4(.05,25,7));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 7);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 0);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                         , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 456, 36 );

    // draws our second wall
    modelView = mat4();
    modelView = lookAt(eye, at, up);
    modelView = mult(modelView, translate(-5,-1.75,0));
    modelView = mult(modelView, scale4(6,25,.1));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 7);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 0);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                         , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 456, 36 );

    // draws our shelf
    modelView = mat4();
    modelView = lookAt(eye, at, up);
    modelView = mult(modelView, translate(-1,2.5,0.25));
    modelView = mult(modelView, scale4(1.2,.5,.7));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 2);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 0);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                         , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 456, 36 );

    // draws our PC
    modelView = mat4();
    modelView = lookAt(eye, at, up);
    modelView = mult(modelView, translate(-3.5,-1.5,0.6));
    modelView = mult(modelView, scale4(.25,5.5,1.1));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 8);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 0);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                         , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 456, 36 );

    // draws Bed
    modelView = mat4();
    modelView = lookAt(eye, at, up);
    modelView = mult(modelView, translate(14,-1.5,1));
    modelView = mult(modelView, scale4(2,5.5,5));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 3);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 0);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                       , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 456, 36 );
    // bed frame
    modelView = mat4();
    modelView = lookAt(eye, at, up);
    modelView = mult(modelView, translate(14,-1.5,0.2));
    modelView = mult(modelView, scale4(2,9.5,.25));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 1);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 1);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                       , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 456, 36 );
    // bed frame
    modelView = mat4();
    modelView = lookAt(eye, at, up);
    modelView = mult(modelView, translate(14,-1.5,16));
    modelView = mult(modelView, scale4(2,9,.25));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 1);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 1);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                         , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 456, 36 );

    // draws our chair
    // chair seat
    modelView = mat4();
    modelView = lookAt(eye, at, up);
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 1);
    modelView = mult(modelView, translate(-0.3,-0.5,6));
    modelView = mult(modelView, scale4(1/2,1/2,1));
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 0);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                       , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 252, 36 );
    // chair legs
    modelView = mat4();
    modelView = lookAt(eye, at, up);
    modelView = mult(modelView, translate(-0.3,-0.5,6));
    modelView = mult(modelView, scale4(1, 1/1.5, 1));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 1);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 0);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                       , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 288, 36 );
    modelView = mult(modelView, translate(2.15, 0, 0));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 1);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 0);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                       , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 288, 36 );
    modelView = mult(modelView, translate(-2.15, 0, 2.65));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 1);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 0);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                       , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 288, 36 );
    modelView = mult(modelView, translate(2.15, 0, 0));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 1);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 0);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                       , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 288, 36 );

    // chair back
    modelView = mat4();
    modelView = lookAt(eye, at, up);
    modelView = mult(modelView, translate(-0.3, 2.0, 8.73));
    modelView = mult(modelView, scale4(1/2, 1/1.2, 1));
    modelView = mult(modelView, rotate(90, 90, 0, 1));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 1);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 0);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                       , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 252, 36 );

    //mousepad
    modelView = mat4();
    modelView = lookAt(eye, at, up);
    modelView = mult(modelView, translate(-2.75,.25,1.8));
    modelView = mult(modelView, scale4(1.5,.1,1));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 10);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 1);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                         , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 456, 36 );

    //mat
    modelView = mat4();
    modelView = lookAt(eye, at, up);
    modelView = mult(modelView, translate(-2.5,-1.5,18));
    modelView = mult(modelView, scale4(1,.5,1));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 11);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 1);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                         , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 456, 36 );

    //blanket
    modelView = mat4();
    modelView = lookAt(eye, at, up);
    modelView = mult(modelView, translate(13.9,-.15,4));
    modelView = mult(modelView, scale4(2,1,4));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 12);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 1);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                         , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 456, 36 );

    modelView = mat4();
    modelView = lookAt(eye, at, up);
    modelView = mult(modelView, translate(13.75,-.95,4));
    modelView = mult(modelView, scale4(.05,4,4));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 12);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 1);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                         , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 456, 36 );

    modelView = mat4();
    modelView = lookAt(eye, at, up);
    modelView = mult(modelView, translate(23.9,-.95,4));
    modelView = mult(modelView, scale4(.05,4,4));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 12);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 1);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                         , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 456, 36 );

    // draws our chalice
    modelView = mat4();
    modelView = lookAt(eye, at, up);
    modelView = mult(modelView, translate(-4, 2.63, 0));
    modelView = mult(modelView, scale4(1/2, 1/2, 1/2));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 5);
    modelView = mult(modelView, translate(10, 0, 2));
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 0);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,
            "modelViewMatrix"), false, flatten(modelView) );

    gl.drawArrays( gl.TRIANGLES, 492, 12*12*6);

    //bottle
    modelView = mat4();
    modelView = lookAt(eye, at, up);
    modelView = mult(modelView, translate(-3.5,.25,3));
    modelView = mult(modelView, scale4(1/6,1/6,1/6));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 4);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 0);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix")
                         , false, flatten(modelView) );
    gl.drawArrays( gl.TRIANGLES, 1356, 10*10*6 );

    // draws our trashcan
    modelView = mat4();
    modelView = lookAt(eye, at, up);
    modelView = mult(modelView, translate(6.5, -1.5, 3));
    modelView = mult(modelView, scale4(.5, .8, 0.5));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 13);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 0);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,
            "modelViewMatrix"), false, flatten(modelView) );

    gl.drawArrays( gl.TRIANGLES, 1956, 9*9*6);

    //draw pillow
    modelView = mat4();
    modelView = lookAt(eye, at, up);
    modelView = mult(modelView, translate(16.5, -0.25, 2.7));
    modelView = mult(modelView, scale4(.7, .3, 0.3236));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 9);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 1);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,
            "modelViewMatrix"), false, flatten(modelView) );

    gl.drawArrays( gl.TRIANGLES, 2442, 9*9*6);

    //draw pillow
    modelView = mat4();
    modelView = lookAt(eye, at, up);
    modelView = mult(modelView, translate(21.5, -0.25, 2.7));
    modelView = mult(modelView, scale4(.7, .3, 0.3236));
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 9);
    gl.uniform1i(gl.getUniformLocation(program, "colorChoice"), 1);
    gl.uniformMatrix4fv( gl.getUniformLocation(program,
            "modelViewMatrix"), false, flatten(modelView) );

    gl.drawArrays( gl.TRIANGLES, 2442, 9*9*6);

}
