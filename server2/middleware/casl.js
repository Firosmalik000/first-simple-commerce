const { ability, abilityBuilder } = require('@casl/ability');

const policies = {
  guest(user, { can }) {
    can('read', 'Product');
  },
  user(user, { can }) {
    can('view', 'Order');
    can('read', 'Order', { user_id: user.id });
    can('create', 'Order');
    can('update', 'User', { user_id: user.id });
    can('read', 'Cart', { user_id: user.id });
    can('update', 'Cart', { user_id: user.id });
    can('view', 'Adress');
    can('update', 'Adress', { user_id: user.id });
    can('create', 'Adress', { user_id: user.id });
    can('delete', 'Adress', { user_id: user.id });
    can('read', 'Invoice', { user_id: user.id });
  },
};

const policyFor = (user) => {
  const builder = new abilityBuilder();
  if (user && typeof policies[user.role] === 'function') {
    policies[user.role](user, builder);
  } else {
    policies['guest'](user, builder);
  }
  return new ability(builder.rules);
};

module.exports = {
  policyFor,
};
