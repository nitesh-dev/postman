export default function RequestInputBox() {
  return (
    <div className="request-input-box">
      <div className="input-area">
        <select>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
        </select>
        <span></span>
        <input type="text" placeholder="https://example.com" />
      </div>
      <button className="btn primary">Send</button>
    </div>
  );
}
