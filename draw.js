// sword
function DrawSword()
{
    quad(0, 5, 9, 4, 0);   // AFJE left side
    quad(3, 4, 9, 8, 0);   // DEJI left roof
    quad(2, 3, 8, 7, 0);
    quad(1, 2, 7, 6, 0);
    quad(0, 1, 6, 5, 0);
    pentagon (5, 6, 7, 8, 9);  // FGHIJ back
    pentagon (0, 4, 3, 2, 1);  // ABCDE (clockwise) front

    quad(10, 13, 17, 14, 0); // ADHE
    quad(13, 12, 16, 17, 0); // DCGH
    quad(12, 11, 15, 16, 0); // CBFG
    quad(10, 11, 15, 14, 0); // ABFE
    quad(10, 13, 12, 11, 0); // ADCB
    quad(14, 15, 16, 17, 0); // EFGH

    quad(18, 21, 25, 22, 0); // ADHE
    quad(21, 20, 24, 25, 0); // DCGH
    quad(20, 19, 23, 24, 0); // CBFG
    quad(18, 19, 23, 22, 0); // ABFE
    quad(18, 21, 20, 19, 0); // ADCB
    quad(22, 23, 24, 25, 0); // EFGH
}

function DrawSShip()
{
    //base
    quad(26, 31, 35, 30);
    quad(29, 30, 35, 34);
    quad(28, 29, 34, 33);
    quad(27, 28, 33, 32);
    quad(26, 27, 32, 31);
    pentagon (31, 32, 33, 34, 35);
    pentagon (26, 30, 29, 28, 27);
    //right wing
    quad(38, 39, 41, 40);
    quad(38, 39, 37, 36);
    quad(36, 37, 41, 40);
    tri(37, 39, 41);
    tri(36, 38, 40);
    //left wing
    quad(44, 45, 47, 46);
    quad(44, 45, 43, 42);
    quad(42, 43, 47, 46);
    tri(43, 45, 47);
    tri(42, 44, 46);
    //top
    quad(48, 49, 51, 50);
    quad(52, 53, 55, 54);
    quad(48, 50, 54, 52);
    quad(49, 51, 55, 53);
    quad(50, 51, 55, 54);
    quad(48, 49, 53, 52);
}

function DrawTable(){
    //top
    quad(56, 57, 59, 58);
    quad(60, 61, 63, 62);
    quad(56, 58, 62, 60);
    quad(57, 59, 63, 61);
    quad(58, 59, 63, 62);
    quad(56, 57, 61, 60);
    //legs
    quad(64, 65, 67, 66);
    quad(68, 69, 71, 70);
    quad(64, 66, 70, 68);
    quad(65, 67, 71, 69);
    quad(66, 67, 71, 70);
    quad(64, 65, 69, 68);
}

function DrawPC(){
    // L shape
    quad(72, 73, 75, 74);
    quad(76, 77, 79, 78);
    quad(72, 74, 78, 76);
    quad(73, 75, 79, 77);
    quad(74, 75, 79, 78);
    quad(72, 73, 77, 76);
    // Screen
    quad(80, 81, 83, 82);
    quad(84, 85, 87, 86);
    quad(80, 82, 86, 84);
    quad(81, 83, 87, 85);
    quad(82, 83, 87, 86);
    quad(80, 81, 85, 84);
    // Back
    quad(88, 89, 91, 90);
    // Front
    quad(92, 93, 95, 94);
    // Sides
    hex(96, 97, 98, 99, 100, 101);
    hex(102, 103, 104, 105, 106, 107);
    hex(108, 109, 110, 111, 112, 113);
    hex(114, 115, 116, 117, 118, 119);
}

function DrawRectangle(){
    quad(56, 57, 59, 58);
    quad(60, 61, 63, 62);
    quad(56, 58, 62, 60);
    quad(57, 59, 63, 61);
    quad(58, 59, 63, 62);
    quad(56, 57, 61, 60);
}

function DrawGlass()
{
    for (var i = 0; i < 13; i++)
    {
        vertices.push(vec4(glass[i][0], glass[i][1], glass[i][2], 1));
    }

    var r;
    var t = Math.PI / 6;

    for (var j = 0; j < 12; j++)
    {
        var angle = (j + 1) * t;

        for (var i = 0; i < 13; i++)
        {
            r = vertices[120 + i][0];
            vertices.push(vec4(r * Math.cos(angle), vertices[120 + i][1], -r * Math.sin(angle), 1));
        }
    }

    var N = 13;

    for (var i = 0; i < 12; i++)
    {
        for (var j = 0; j < 12; j++)
        {
            quad2(i * N + j, (i + 1) * N + j, (i + 1) * N + (j + 1), i * N + (j + 1), 120);
        }
    }
}

function DrawBottle()
{
    for (var i = 0; i < 11; i++)
    {
        vertices.push(vec4(bottle[i][0], bottle[i][1], bottle[i][2], 1));
    }

    var r;
    var t = Math.PI / 5;

    for (var j = 0; j < 10; j++)
    {
        var angle = (j + 1) * t;

        for (var i = 0; i < 11; i++)
        {
            r = vertices[289 + i][0];
            vertices.push(vec4(r * Math.cos(angle), vertices[289 + i][1], -r * Math.sin(angle), 1));
        }
    }
    var N = 11;

    for (var i = 0; i < 10; i++)
    {
        for (var j = 0; j < 10; j++)
        {
            quad2(i * N + j, (i + 1) * N + j, (i + 1) * N + (j + 1), i * N + (j + 1), 289);
        }
    }
}

function DrawTrashCan()
{
    for (var i = 0; i < 10; i++)
    {
        vertices.push(vec4(plantPot[i][0], plantPot[i][1], plantPot[i][2], 1));
    }

    var r;
    var t = Math.PI / 4.5;

    for (var j = 0; j < 9; j++)
    {
        var angle = (j + 1) * t;

        for (var i = 0; i < 10; i++)
        {
            r = vertices[410 + i][0];
            vertices.push(vec4(r * Math.cos(angle), vertices[410 + i][1], -r * Math.sin(angle), 1));
        }
    }
    var N = 10;

    for (var i = 0; i < 9; i++)
    {
        for (var j = 0; j < 9; j++)
        {
            quad2(i * N + j, (i + 1) * N + j, (i + 1) * N + (j + 1), i * N + (j + 1), 410);
        }
    }
}

function DrawPillow()
{
    for (var i = 0; i < 10; i++)
    {
        vertices.push(vec4(pillow[i][0], pillow[i][1], pillow[i][2], 1));
    }

    var r;
    var t = Math.PI / 4.5;

    for (var j = 0; j < 10; j++)
    {
        var angle = (j + 1) * t;

        for (var i = 0; i < 10; i++)
        {
            r = vertices[510 + i][0];
            vertices.push(vec4(r * Math.cos(angle), vertices[510 + i][1], -r * Math.sin(angle), 1));
        }
    }
    var N = 10;

    for (var i = 0; i < 9; i++)
    {
        for (var j = 0; j < 9; j++)
        {
            quad2(i * N + j, (i + 1) * N + j, (i + 1) * N + (j + 1), i * N + (j + 1), 510);
        }
    }
}
