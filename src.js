import memoize from 'memoizee';


const foo = memoize(() => {});

foo();
foo();
