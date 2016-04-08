window.onload = function() {

  var _scene = document.getElementById("scene");

  var Turtle = {
    sprite: null,
    spriteUrl: "images/turtle.png",
    maxRight: 0,
    maxTop: 0,
    speed: 5,
    stamina: 100,
    energy: 100, // should intially be the same as stamina
    exhausted: false,
    init: function() {
      var spriteImage = document.createElement("div");
      spriteImage.style.backgroundImage = "url("+this.spriteUrl+")";
      this.sprite = document.createElement("div");
      this.sprite.appendChild(spriteImage); // needed for transforms
      this.sprite.className = "sprite oriented east";
      this.sprite.tabIndex = 1;

      var _turtle = this;

      this.sprite.addEventListener("keypress", function(e) {
        if([100,119,97,115].indexOf(e.keyCode) == -1) return; // Not a keypress we care about
        console.log("Energy level: " + _turtle.energy);
        if(_turtle.exhausted) return "exhausted";
        switch(e.keyCode) {
          case 100: // D - Right
            _turtle.sprite.className = "sprite oriented east";
            _turtle.moveCharacterX(true);
            break;
          case 119: // W - Up
            _turtle.sprite.className = "sprite oriented north";
            _turtle.moveCharacterY(true);
            break;
          case 97:  // A - Left
            _turtle.sprite.className = "sprite oriented west";
            _turtle.moveCharacterX(false);
            break;
          case 115:  // S - Down
            _turtle.sprite.className = "sprite oriented south";
            _turtle.moveCharacterY(false);
            break;
        }
        _turtle.isMoving();
      });
      this.sprite.addEventListener("keyup", function() {
        _turtle.recharge();
      });
    },
    recharge: function() {
      if(this.recharging) return;
      _turtle = this;
      this.recharging = setInterval(function() {
        _turtle.energy += 10;
        if(_turtle.energy >= _turtle.stamina) {
          _turtle.recharged();
        }
      }, 1000 / (this.stamina / 25));
    },
    stopRecharging: function() {
      clearInterval(this.recharging);
      this.recharging = null;
    },
    recharged: function() {
      this.stopRecharging();
      this.exhausted = false;
      this.sprite.classList.remove("exhausted");
    },
    useEnergy: function() {
      if(this.usingEnergy) return;
      _turtle = this;
      this.usingEnergy = setInterval(function() {
        _turtle.energy -= 10;
        if(_turtle.energy <= 0) {
          _turtle.outOfEnergy();
        }
      }, 1000);
    },
    outOfEnergy: function() {
      this.stopUsingEnergy();
      this.exhausted = true;
      this.sprite.classList.add("exhausted");
      this.recharge();
    },
    stopUsingEnergy: function() {
      clearInterval(this.usingEnergy);
      this.usingEnergy = null;
    },
    isMoving: function() {
      if(this.usingEnergy) return;
      this.stopRecharging();
      this.useEnergy();
    },
    moveCharacterX: function(forward) {
      var currPos = parseInt(this.sprite.style.left) || 0;
      var newPos = forward ? currPos + this.speed : currPos - this.speed;
      if(newPos < 0) newPos = 0;
      if(newPos > this.maxRight) newPos = this.maxRight;
      this.sprite.style.left = newPos + "px";
    },
    moveCharacterY: function(up) {
      var currPos = parseInt(this.sprite.style.bottom) || 0;
      var newPos = up ? currPos + this.speed : currPos - this.speed;
      if(newPos < 0) newPos = 0;
      if(newPos > this.maxTop) newPos = this.maxTop;
      this.sprite.style.bottom = newPos + "px";
    },
    attachTo: function(__scene, x, y) {
      this.sprite.style.bottom = (y || 0) + "px";
      this.sprite.style.left = (x || 0) + "px";
      this.maxRight = __scene.offsetWidth - 175;
      this.maxTop = __scene.offsetHeight - 175;
      __scene.appendChild(this.sprite);
    }
  }

  Turtle.init();
  Turtle.attachTo(_scene, 100, 0);

  var Hare = {
    sprite: null,
    spriteUrl: "images/hare.png",
    maxRight: 0,
    maxTop: 0,
    speed: 15,
    stamina: 10,
    energy: 10, // should intially be the same as stamina
    exhausted: false,
    init: function() {
      var spriteImage = document.createElement("div");
      spriteImage.style.backgroundImage = "url("+this.spriteUrl+")";
      this.sprite = document.createElement("div");
      this.sprite.appendChild(spriteImage); // needed for transforms
      this.sprite.className = "sprite oriented east";
      this.sprite.tabIndex = 1;

      var _hare = this;

      this.sprite.addEventListener("keypress", function(e) {
        if([100,119,97,115].indexOf(e.keyCode) == -1) return; // Not a keypress we care about
        console.log("Energy level: " + _hare.energy);
        if(_hare.exhausted) return "exhausted";
        switch(e.keyCode) {
          case 100: // D - Right
            _hare.sprite.className = "sprite oriented east";
            _hare.moveCharacterX(true);
            break;
          case 119: // W - Up
            _hare.sprite.className = "sprite oriented north";
            _hare.moveCharacterY(true);
            break;
          case 97:  // A - Left
            _hare.sprite.className = "sprite oriented west";
            _hare.moveCharacterX(false);
            break;
          case 115:  // S - Down
            _hare.sprite.className = "sprite oriented south";
            _hare.moveCharacterY(false);
            break;
        }
        _hare.isMoving();
      });
      this.sprite.addEventListener("keyup", function() {
        _hare.recharge();
      });
    },
    recharge: function() {
      if(this.recharging) return;
      _hare = this;
      this.recharging = setInterval(function() {
        _hare.energy += 10;
        if(_hare.energy >= _hare.stamina) {
          _hare.recharged();
        }
      }, 1000 / (this.stamina / 25));
    },
    stopRecharging: function() {
      clearInterval(this.recharging);
      this.recharging = null;
    },
    recharged: function() {
      this.stopRecharging();
      this.exhausted = false;
      this.sprite.classList.remove("exhausted");
    },
    useEnergy: function() {
      if(this.usingEnergy) return;
      _hare = this;
      this.usingEnergy = setInterval(function() {
        _hare.energy -= 10;
        if(_hare.energy <= 0) {
          _hare.outOfEnergy();
        }
      }, 1000);
    },
    outOfEnergy: function() {
      this.stopUsingEnergy();
      this.exhausted = true;
      this.sprite.classList.add("exhausted");
      this.recharge();
    },
    stopUsingEnergy: function() {
      clearInterval(this.usingEnergy);
      this.usingEnergy = null;
    },
    isMoving: function() {
      if(this.usingEnergy) return;
      this.stopRecharging();
      this.useEnergy();
    },
    moveCharacterX: function(forward) {
      var currPos = parseInt(this.sprite.style.left) || 0;
      var newPos = forward ? currPos + this.speed : currPos - this.speed;
      if(newPos < 0) newPos = 0;
      if(newPos > this.maxRight) newPos = this.maxRight;
      this.sprite.style.left = newPos + "px";
    },
    moveCharacterY: function(up) {
      var currPos = parseInt(this.sprite.style.bottom) || 0;
      var newPos = up ? currPos + this.speed : currPos - this.speed;
      if(newPos < 0) newPos = 0;
      if(newPos > this.maxTop) newPos = this.maxTop;
      this.sprite.style.bottom = newPos + "px";
    },
    attachTo: function(__scene, x, y) {
      this.sprite.style.bottom = (y || 0) + "px";
      this.sprite.style.left = (x || 0) + "px";
      this.maxRight = __scene.offsetWidth - 175;
      this.maxTop = __scene.offsetHeight - 175;
      __scene.appendChild(this.sprite);
    }
  }

  Hare.init();
  Hare.attachTo(_scene, 100, 150);

}
