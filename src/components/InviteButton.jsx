// invite button for collaboration

function InviteButton({ disabled = true }) {
  return (
    <>
      <button
        className="invite"
        id="invite"
        disabled={disabled ? disabled : false}
        style={{background: 'none'}}
      >
        <i className="ri-user-add-line mr-1"></i>
        Invite
      </button>
    </>
  );
}

export default InviteButton;
