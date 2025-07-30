// invite button for collaboration

function InviteButton({ disabled = true }) {
  return (
    <>
      <button
        className="invite"
        id="invite"
        disabled={disabled ? disabled : false}
      >
        <i class="ri-user-add-line"></i>
        Invite
      </button>
    </>
  );
}

export default InviteButton;
