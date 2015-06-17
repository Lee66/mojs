(function() {
  var PathEasing, h;

  h = mojs.h;

  PathEasing = mojs.easing.PathEasing;

  describe('PathEasing ->', function() {
    it('should be a function', function() {
      return expect(typeof mojs.easing.PathEasing).toBe('function');
    });
    it('should not init if "creator" was passed', function() {
      var pe;
      pe = new PathEasing('creator');
      return expect(pe.precision).not.toBeDefined();
    });
    describe('path parsing ->', function() {
      it('should parse path', function() {
        var path, pe;
        path = 'M0,0 10,10';
        spyOn(h, 'parsePath');
        pe = new PathEasing(path);
        return expect(h.parsePath).toHaveBeenCalledWith(path);
      });
      it('should save path and pathLength', function() {
        var path, pe;
        path = 'M0,0 10,10';
        pe = new PathEasing(path);
        expect(pe.path).toBeDefined();
        return expect(pe.pathLength).toBe(pe.path.getTotalLength());
      });
      return it('should error if path wasnt parsed', function() {
        var path, pe;
        path = 'M0,0 10,10';
        spyOn(h, 'error');
        spyOn(h, 'parsePath');
        pe = new PathEasing(path);
        return expect(h.error).toHaveBeenCalled();
      });
    });
    describe('options ->', function() {
      it('should recieve "precision" option', function() {
        var path, pe;
        path = 'M0,0 10,10';
        pe = new PathEasing(path, {
          precision: 10
        });
        return expect(pe.precision).toBe(10);
      });
      return it('should recieve "rect" option', function() {
        var path, pe;
        path = 'M0,0 10,10';
        pe = new PathEasing(path, {
          rect: 200
        });
        return expect(pe.rect).toBe(200);
      });
    });
    describe('_preSample method ->', function() {
      return it('should pre sample the path', function() {
        var pe;
        pe = new PathEasing('M0,100 100,0');
        expect(pe._samples['0']).toBeDefined();
        expect(pe._samples['0.01']).toBeDefined();
        expect(pe._samples['0.02']).toBeDefined();
        return expect(pe._samples['0.5']).toBeDefined();
      });
    });
    describe('create method ->', function() {
      return it('should create new instance of path-easing and return sample method', function() {
        var easing, pe;
        pe = new PathEasing('creator');
        easing = pe.create('M0,100 100,0', {
          precision: 10
        });
        expect(typeof easing).toBe('function');
        return expect(easing(.5)).toBe(.5);
      });
    });
    return describe('sample method ->', function() {
      it('should clamp x value', function() {
        var path, pe;
        path = 'M0,100 100,0';
        pe = new PathEasing(path);
        expect(pe.sample(-.5)).toBeCloseTo(0, 5);
        return expect(pe.sample(1.5)).toBeCloseTo(1, 5);
      });
      it('should return y', function() {
        var path, pe;
        path = 'M0,100 100,0';
        pe = new PathEasing(path);
        return expect(pe.sample(.7)).toBe(.7);
      });
      return it('should sample y', function() {
        var path, pe;
        path = 'M0,100 100,0';
        pe = new PathEasing(path, {
          isIt: true
        });
        return expect(pe.sample(.705)).toBe(.705);
      });
    });
  });

}).call(this);