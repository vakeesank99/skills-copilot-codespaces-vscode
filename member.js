function skillsMember() {
  return {
    name: 'skillsMember',
    type: 'list',
    message: 'Select a member to add skills to',
    choices: members.map((member) => member.name),
  };
}
