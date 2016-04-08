window.onload = function() {

  var _scene = document.getElementById("scene");

  function Sprite(imageUrl, initialOrientation) {
    var oriented = initialOrientation ? initialOrientation : "east";
    var spriteImageElement = document.createElement("div");
    spriteImageElement.style.backgroundImage = "url("+imageUrl+")";
    this.element = document.createElement("div");
    this.element.appendChild(spriteImageElement); // needed for transforms
    this.element.className = "sprite oriented " + oriented;
    this.element.tabIndex = 1;
  }

  Sprite.prototype.on = function(event, callback) {
    this.element.addEventListener(event, callback);
  }

  Sprite.prototype.addClass = function() {
    for(i=0;i<arguments.length;i++) {
      this.element.classList.add(arguments[i])
    }
  }

  Sprite.prototype.removeClass = function() {
    for(i=0;i<arguments.length;i++) {
      this.element.classList.remove(arguments[i])
    }
  }

  Sprite.prototype.orient = function(direction) {
    this.removeClass("north", "south", "east", "west");
    this.addClass(direction)
  }

  Sprite.prototype.getLeft = function() {
    return parseInt(this.element.style.left) || 0;
  }

  Sprite.prototype.setLeft = function(pos) {
    this.element.style.left = pos + "px";
  }

  Sprite.prototype.getBottom = function() {
    return parseInt(this.element.style.bottom) || 0;
  }

  Sprite.prototype.setBottom = function(pos) {
    this.element.style.bottom = pos + "px";
  }


  function Character(imageUrl, speed, stamina) {
    this.sprite = null;
    this.spriteUrl = imageUrl;
    this.maxRight = 0;
    this.maxTop = 0;
    this.speed = speed || 10;
    this.stamina = this.energy = stamina || 100;
    this.exhausted = false;

    this.sprite = new Sprite(this.spriteUrl);

    var _instance = this;

    this.sprite.on("keypress", function(e) {
      if([100,119,97,115].indexOf(e.keyCode) == -1) return; // Not a keypress we care about
      console.log("Energy level: " + _instance.energy);
      if(_instance.exhausted) return "exhausted";
      switch(e.keyCode) {
        case 100: // D - Right
          _instance.sprite.orient("east")
          _instance.moveCharacterX(true);
          break;
        case 119: // W - Up
          _instance.sprite.orient("north")
          _instance.moveCharacterY(true);
          break;
        case 97:  // A - Left
          _instance.sprite.orient("west")
          _instance.moveCharacterX(false);
          break;
        case 115:  // S - Down
          _instance.sprite.orient("south")
          _instance.moveCharacterY(false);
          break;
      }
      _instance.isMoving();
    });
    this.sprite.on("keyup", function() {
      _instance.recharge();
    });
  }

  Character.prototype.recharge = function() {
    if(this.recharging) return;
    var _instance = this;
    this.recharging = setInterval(function() {
      _instance.energy += 10;
      if(_instance.energy >= _instance.stamina) {
        _instance.recharged();
      }
    }, 1000 / (this.stamina / 25));
  }

  Character.prototype.stopRecharging = function() {
    clearInterval(this.recharging);
    this.recharging = null;
  }

  Character.prototype.recharged =  function() {
    this.stopRecharging();
    this.exhausted = false;
    this.sprite.removeClass("exhausted");
  }

  Character.prototype.useEnergy =  function() {
    if(this.usingEnergy) return;
    var _instance = this;
    this.usingEnergy = setInterval(function() {
      _instance.energy -= 10;
      if(_instance.energy <= 0) {
        _instance.outOfEnergy();
      }
    }, 1000);
  }

  Character.prototype.outOfEnergy = function() {
    this.stopUsingEnergy();
    this.exhausted = true;
    this.sprite.addClass("exhausted");
    this.recharge();
  }

  Character.prototype.stopUsingEnergy = function() {
    clearInterval(this.usingEnergy);
    this.usingEnergy = null;
  }

  Character.prototype.isMoving = function() {
    if(this.usingEnergy) return;
    this.stopRecharging();
    this.useEnergy();
  }

  Character.prototype.moveCharacterX = function(forward) {
    var currPos = this.sprite.getLeft();
    console.log("Currpos", currPos)
    var newPos = forward ? currPos + this.speed : currPos - this.speed;
    if(newPos < 0) newPos = 0;
    if(newPos > this.maxRight) newPos = this.maxRight;
    this.sprite.setLeft(newPos);
  }

  Character.prototype.moveCharacterY = function(up) {
    var currPos = this.sprite.getBottom();
    var newPos = up ? currPos + this.speed : currPos - this.speed;
    if(newPos < 0) newPos = 0;
    if(newPos > this.maxTop) newPos = this.maxTop;
    this.sprite.setBottom(newPos);
  }

  Character.prototype.attachTo = function(__scene, x, y) {
    this.sprite.setBottom(y || 0);
    this.sprite.setLeft(x || 0);
    this.maxRight = __scene.offsetWidth - 175;
    this.maxTop = __scene.offsetHeight - 175;
    __scene.appendChild(this.sprite.element);
  }

  var turtle = new Character("images/turtle.png", 5, 100);
  turtle.attachTo(_scene, 100, 0)

  var hare = new Character("images/hare.png", 20, 15);
  hare.attachTo(_scene, 100, 150);
}
