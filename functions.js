
function tri(a, b, c) {
     var t1 = subtract(vertices[b], vertices[a]);
     var t2 = subtract(vertices[c], vertices[b]);
     var normal = cross(t1, t2);
     var normal = vec3(normal);
     normal = normalize(normal);

     pointsArray.push(vertices[a]);
     normalsArray.push(normal);
     texCoord.push(tex[0]);
     pointsArray.push(vertices[b]);
     normalsArray.push(normal);
     texCoord.push(tex[1]);
     pointsArray.push(vertices[c]);
     normalsArray.push(normal);
     texCoord.push(tex[2]);
}

function quad(a, b, c, d) {
    var t1 = subtract(vertices[b], vertices[a]);
    var t2 = subtract(vertices[c], vertices[b]);
    var normal = cross(t1, t2);
    var normal = vec3(normal);
    normal = normalize(normal);

    pointsArray.push(vertices[a]);
    normalsArray.push(normal);
    texCoord.push(tex[0]);
    pointsArray.push(vertices[b]);
    normalsArray.push(normal);
    texCoord.push(tex[1]);
    pointsArray.push(vertices[c]);
    normalsArray.push(normal);
    texCoord.push(tex[2]);

    pointsArray.push(vertices[a]);
    normalsArray.push(normal);
    texCoord.push(tex[0]);
    pointsArray.push(vertices[c]);
    normalsArray.push(normal);
    texCoord.push(tex[2]);
    pointsArray.push(vertices[d]);
    normalsArray.push(normal);
    texCoord.push(tex[3]);
}

function quad2(a, b, c, d, index) {
    var t1 = subtract(vertices[b + index], vertices[a + index]);
    var t2 = subtract(vertices[c + index], vertices[b + index]);
    var normal = cross(t1, t2);
    var normal = vec3(normal);
    normal = normalize(normal);

    pointsArray.push(vertices[a + index]);
    normalsArray.push(normal);
    texCoord.push(tex[0]);
    pointsArray.push(vertices[b + index]);
    normalsArray.push(normal);
    texCoord.push(tex[1]);
    pointsArray.push(vertices[c + index]);
    normalsArray.push(normal);
    texCoord.push(tex[2]);

    pointsArray.push(vertices[a + index]);
    normalsArray.push(normal);
    texCoord.push(tex[0]);
    pointsArray.push(vertices[c + index]);
    normalsArray.push(normal);
    texCoord.push(tex[2]);
    pointsArray.push(vertices[d + index]);
    normalsArray.push(normal);
    texCoord.push(tex[3]);
}

function pentagon(a, b, c, d, e) {
    var t1 = subtract(vertices[b], vertices[a]);
    var t2 = subtract(vertices[c], vertices[b]);
    var normal = cross(t1, t2);
    var normal = vec3(normal);
    normal = normalize(normal);

    pointsArray.push(vertices[a]);
    normalsArray.push(normal);
    texCoord.push(tex[0]);
    pointsArray.push(vertices[b]);
    normalsArray.push(normal);
    texCoord.push(tex[1]);
    pointsArray.push(vertices[c]);
    normalsArray.push(normal);
    texCoord.push(tex[2]);

    pointsArray.push(vertices[a]);
    normalsArray.push(normal);
    texCoord.push(tex[0]);
    pointsArray.push(vertices[c]);
    normalsArray.push(normal);
    texCoord.push(tex[2]);
    pointsArray.push(vertices[d]);
    normalsArray.push(normal);
    texCoord.push(tex[3]);

    pointsArray.push(vertices[a]);
    normalsArray.push(normal);
    texCoord.push(tex[1]);
    pointsArray.push(vertices[d]);
    normalsArray.push(normal);
    texCoord.push(tex[2]);
    pointsArray.push(vertices[e]);
    normalsArray.push(normal);
    texCoord.push(tex[3]);
}

function hex(a, b, c, d, e, f) {
     var t1 = subtract(vertices[b], vertices[a]);
     var t2 = subtract(vertices[c], vertices[b]);
     var normal = cross(t1, t2);
     var normal = vec3(normal);
     normal = normalize(normal);

     pointsArray.push(vertices[a]);
     normalsArray.push(normal);
     texCoord.push(tex[0]);
     pointsArray.push(vertices[b]);
     normalsArray.push(normal);
     texCoord.push(tex[1]);
     pointsArray.push(vertices[c]);
     normalsArray.push(normal);
     texCoord.push(tex[2]);

     pointsArray.push(vertices[b]);
     normalsArray.push(normal);
     texCoord.push(tex[0]);
     pointsArray.push(vertices[c]);
     normalsArray.push(normal);
     texCoord.push(tex[2]);
     pointsArray.push(vertices[d]);
     normalsArray.push(normal);
     texCoord.push(tex[3]);

     pointsArray.push(vertices[c]);
     normalsArray.push(normal);
     texCoord.push(tex[1]);
     pointsArray.push(vertices[d]);
     normalsArray.push(normal);
     texCoord.push(tex[2]);
     pointsArray.push(vertices[e]);
     normalsArray.push(normal);
     texCoord.push(tex[3]);

     pointsArray.push(vertices[d]);
     normalsArray.push(normal);
     texCoord.push(tex[1]);
     pointsArray.push(vertices[e]);
     normalsArray.push(normal);
     texCoord.push(tex[3]);
     pointsArray.push(vertices[f]);
     normalsArray.push(normal);
     texCoord.push(tex[2]);
}

function scale4(a, b, c) {
   	var result = mat4();
   	result[0][0] = a;
   	result[1][1] = b;
   	result[2][2] = c;
   	return result;
}
