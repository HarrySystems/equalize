import helperElement from '../lib/element';
import helperFixture from '../lib/fixture';
import helperReady from '../lib/ready';

import skateMaster from '../../src/index';
import '../skate/0.14.3.js';

const { skate } = window;

describe('multiple-versions', function () {
  it('is possible to have multiple versions of skate on the page', function (done) {
    var called = [];

    function skateAndCreate(customSkate) {
      const el = helperElement();
      customSkate(el.safe, {
        created () {
          called.push(customSkate.version);
        }
      });
      helperFixture(document.createElement(el.safe));
    }

    skateAndCreate(skateMaster);
    skateAndCreate(skate);

    helperReady(function () {
      expect(called.sort()).to.deep.equal([skateMaster.version, skate.version].sort());
      done();
    });
  });
});