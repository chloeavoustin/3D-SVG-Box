function Box(idBox, idContainer) {
    this.box = document.getElementById(idBox);
    this.containerBox = document.getElementById(idContainer);

    this.check();

    this.width = this.containerBox.offsetWidth;
    var x = this.width - (2 * this.borderHorizontal);
    var y = (x / this.columns) * ( this.lenght / this.columns);
    this.height = y + (this.borderVertical * 2);

    this.color = "7ba9a3";
    this.colorLight = "a2dfd7";
    this.colorBottom1 = "6d938e";
    this.colorBottom2 = "51706c";
}

Box.prototype.check = function () {
    if (this.box === null) {
        throw new Error('Box id is not defined.');
    }

    if (this.containerBox === null) {
        throw new Error('Container id is not defined.');
    }

    this.svgUrl = "http://www.w3.org/2000/svg";
    if (this.containerBox === null) {
        throw new Error('Xmlns url is not defined.');
    }

    this.lenght = parseFloat(this.box.getAttribute('data-nb-elements'));
    if (!(typeof this.lenght === 'number') && !(this.lenght % 1 === 0)) {
        throw new Error('data-nb-elements of svg must be a number defined.');
    }

    this.borderVertical = parseFloat(this.box.getAttribute('data-border-vertical'));
    if (!(typeof this.borderVertical === 'number') && !(this.borderVertical % 1 === 0)) {
        throw new Error('data-border-vertical of svg must be a number defined.');
    }

    this.borderHorizontal = parseFloat(this.box.getAttribute('data-border-horizontal'));
    if (!(typeof this.borderHorizontal === 'number') && !(this.borderHorizontal % 1 === 0)) {
        throw new Error('data-border-horizontal of svg must be a number defined.');
    }

    this.columns = parseFloat(this.box.getAttribute('data-nb-columns'));
    if (!(typeof this.columns === 'number') && !(this.columns % 1 === 0)) {
        throw new Error('data-nb-columns of svg must be a number defined.');
    }
};

Box.prototype.build = function () {
    this.box.setAttribute("height", this.height);
    this.definedCoordinates();
    this.makeShape();
};

Box.prototype.definedCoordinates = function () {
    var position1 = this.width - this.borderHorizontal;
    var position2 = this.height - this.borderVertical;

    this.points = [
        0 + ',' + 0,
        this.width + ',' + 0,
        this.width + ',' + this.height,
        0 + ',' + this.height,
        this.borderHorizontal + ',' + this.borderVertical,
        position1 + ',' + this.borderVertical,
        position1 + ',' + position2,
        this.borderHorizontal + ',' + position2
    ]
};

Box.prototype.makeShape = function () {

    this.addGardient("top", "0", "0", "100%", "0", "#" + this.color, "#" + this.colorLight);
    this.addGardient("bottom", "0", "0", "100%", "0", "#" + this.colorBottom1, "#" + this.colorBottom2);
    this.addGardient("left", "0", "100%", "0", "0", "#" + this.colorLight, "#" + this.color);
    this.addGardient("right", "100%", "0", "0", "0", "#" + this.colorLight, "#" + this.color);


    this.addPolygon(this.points[0] + " " + this.points[1] + " " + this.points[5] + " " + this.points[4], "url(#top)", "none");
    this.addPolygon(this.points[3] + " " + this.points[7] + " " + this.points[6] + " " + this.points[2], "url(#bottom)", "none");
    this.addPolygon(this.points[0] + " " + this.points[4] + " " + this.points[7] + " " + this.points[3], "url(#left)", "none");
    this.addPolygon(this.points[5] + " " + this.points[1] + " " + this.points[2] + " " + this.points[6], "url(#right)", "none");
};

Box.prototype.addGardient = function (id, x1, x2, y1, y2, stopColor1, stopColor2) {
    var defs = document.createElementNS(this.svgUrl, "defs");
    var gradient = document.createElementNS(this.svgUrl, "linearGradient");

    gradient.setAttributeNS("", "id", id);
    gradient.setAttributeNS("", "x1", x1);
    gradient.setAttributeNS("", "x2", x2);
    gradient.setAttributeNS("", "y1", y1);
    gradient.setAttributeNS("", "y2", y2);

    var colorStart = document.createElementNS(this.svgUrl, "stop");
    colorStart.setAttributeNS("", "offset", "0%");
    colorStart.setAttributeNS("", "stop-color", stopColor1);
    gradient.appendChild(colorStart);

    var colorEnd = document.createElementNS(this.svgUrl, "stop");
    colorEnd.setAttributeNS("", "offset", "100%");
    colorEnd.setAttributeNS("", "stop-color", stopColor2);
    gradient.appendChild(colorEnd);

    defs.appendChild(gradient);
    this.box.appendChild(defs);
};

Box.prototype.addPolygon = function (points, fill, stroke) {
    var shape = document.createElementNS(this.svgUrl, "polygon");
    shape.setAttributeNS("", "points", points);
    shape.setAttributeNS("", "fill", fill);
    shape.setAttributeNS("", "stroke", stroke);

    this.box.appendChild(shape);
};

var svgBox = function (idBoxContainer) {
    var container = document.getElementById(idBoxContainer);
    if (container === null) {
        throw new Error('There is no container with this id: ' + idBoxContainer);
    }

    var svg = container.getElementsByTagName('svg')[0];
    if (svg === null) {
        throw new Error('There is no svg in the container.');
    }

    var idBox = svg.getAttribute('id');
    if (idBox === null) {
        throw new Error('Svg must have an id.');
    }

    var box = new Box(idBox, idBoxContainer);
    box.build();
}; 

