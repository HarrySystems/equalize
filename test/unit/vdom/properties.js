import element from '../../lib/element';
import { prop, symbols, vdom } from '../../../src/index';

describe('properties', function () {
  it('class -> className', function () {
    const elem = new (element().skate({
      render () {
        vdom.element('div', { class: 'test' });
      }
    }));
    expect(elem[symbols.shadowRoot].firstChild.className).to.equal('test');
  });

  it('false should remove the attribute', function () {
    const elem = new (element().skate({
      render () {
        vdom.element('div', { test: false });
      }
    }));
    expect(elem[symbols.shadowRoot].firstChild.hasAttribute('test')).to.equal(false);
  });

  describe.only('re-rendering', () => {
    let Elem1, Elem2;

    beforeEach(() => {
      Elem1 = element().skate({
        props: {
          open: prop.boolean()
        },
        render (elem) {
          vdom.element(Elem2, { open: elem.open }, () => {
            vdom.element('slot');
          });
        },
      });
      Elem2 = element().skate({
        props: {
          open: prop.boolean()
        },
        render (elem) {
          vdom.text(elem.open ? 'open' : 'closed');
        },
      });
    });

    function text(elem) {
      return elem[symbols.shadowRoot].firstChild[symbols.shadowRoot].textContent;
    }

    it('boolean: false -> true', () => {
      const elem = new Elem1();
      expect(text(elem)).to.equal('open');
    });

    it('boolean: true -> false', () => {
      const elem = new Elem1();
      expect(text(elem)).to.equal('closed');
    });
  });
});
