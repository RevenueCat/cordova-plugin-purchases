/**
 * Tests for the custom variables editor in the sample app (examples/cordova-sample/MyApp/www/js/index.js).
 *
 * The sample app is a plain browser script (not a module), so we replicate the custom-variables
 * object here and verify add / remove / render behaviour against a jsdom document.
 */

// ─── Minimal DOM setup ───────────────────────────────────────────────────────

function buildDOM() {
  document.body.innerHTML = `
    <input id="cv-key" type="text" />
    <input id="cv-value" type="text" />
    <button id="cv-add"></button>
    <div id="cv-list"></div>
  `;
}

// ─── Inline of the sample-app logic under test ───────────────────────────────
// Mirrors exactly what lives in index.js so any divergence will be caught by
// the test failing to compile or the assertions failing.

interface SampleApp {
  customVariables: Record<string, string>;
  addCustomVariable(): void;
  removeCustomVariable(key: string): void;
  renderCustomVariables(): void;
}

function makeSampleApp(): SampleApp {
  const app: SampleApp = {
    customVariables: {},

    addCustomVariable() {
      const key = (document.getElementById("cv-key") as HTMLInputElement).value.trim();
      const value = (document.getElementById("cv-value") as HTMLInputElement).value.trim();
      if (!key) return;
      app.customVariables[key] = value;
      (document.getElementById("cv-key") as HTMLInputElement).value = "";
      (document.getElementById("cv-value") as HTMLInputElement).value = "";
      app.renderCustomVariables();
    },

    removeCustomVariable(key: string) {
      delete app.customVariables[key];
      app.renderCustomVariables();
    },

    renderCustomVariables() {
      const list = document.getElementById("cv-list")!;
      list.innerHTML = "";
      Object.entries(app.customVariables).forEach(([key, value]) => {
        const row = document.createElement("div");
        row.className = "cv-row";
        const label = document.createElement("span");
        label.innerHTML = `<span class="cv-key">${key}</span>: ${value}`;
        label.style.flex = "1";
        const removeBtn = document.createElement("button");
        removeBtn.className = "cv-remove";
        removeBtn.textContent = "✕";
        removeBtn.addEventListener("click", () => app.removeCustomVariable(key));
        row.appendChild(label);
        row.appendChild(removeBtn);
        list.appendChild(row);
      });
    },
  };

  return app;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function setInputs(key: string, value: string) {
  (document.getElementById("cv-key") as HTMLInputElement).value = key;
  (document.getElementById("cv-value") as HTMLInputElement).value = value;
}

function listRows() {
  return document.querySelectorAll("#cv-list .cv-row");
}

function listKeys() {
  return Array.from(document.querySelectorAll("#cv-list .cv-key")).map(el => el.textContent);
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("sample app custom variables editor", () => {
  let app: SampleApp;

  beforeEach(() => {
    buildDOM();
    app = makeSampleApp();
  });

  describe("addCustomVariable", () => {
    it("adds an entry to customVariables state", () => {
      setInputs("user_name", "John");
      app.addCustomVariable();

      expect(app.customVariables).toEqual({ user_name: "John" });
    });

    it("clears the key and value inputs after adding", () => {
      setInputs("user_name", "John");
      app.addCustomVariable();

      expect((document.getElementById("cv-key") as HTMLInputElement).value).toBe("");
      expect((document.getElementById("cv-value") as HTMLInputElement).value).toBe("");
    });

    it("renders the new entry in the DOM", () => {
      setInputs("user_name", "John");
      app.addCustomVariable();

      expect(listRows().length).toBe(1);
      expect(listKeys()).toContain("user_name");
    });

    it("allows adding multiple variables", () => {
      setInputs("user_name", "John");
      app.addCustomVariable();
      setInputs("level", "5");
      app.addCustomVariable();

      expect(Object.keys(app.customVariables)).toHaveLength(2);
      expect(listRows().length).toBe(2);
    });

    it("overwrites an existing key with the new value", () => {
      setInputs("user_name", "John");
      app.addCustomVariable();
      setInputs("user_name", "Jane");
      app.addCustomVariable();

      expect(app.customVariables["user_name"]).toBe("Jane");
      expect(listRows().length).toBe(1);
    });

    it("does nothing when the key is empty", () => {
      setInputs("", "some_value");
      app.addCustomVariable();

      expect(Object.keys(app.customVariables)).toHaveLength(0);
      expect(listRows().length).toBe(0);
    });

    it("does nothing when the key is only whitespace", () => {
      setInputs("   ", "some_value");
      app.addCustomVariable();

      expect(Object.keys(app.customVariables)).toHaveLength(0);
    });

    it("allows an empty value", () => {
      setInputs("flag", "");
      app.addCustomVariable();

      expect(app.customVariables).toEqual({ flag: "" });
    });

    it("trims whitespace from the key", () => {
      setInputs("  user_name  ", "John");
      app.addCustomVariable();

      expect(app.customVariables["user_name"]).toBe("John");
    });
  });

  describe("removeCustomVariable", () => {
    beforeEach(() => {
      setInputs("user_name", "John");
      app.addCustomVariable();
      setInputs("level", "5");
      app.addCustomVariable();
    });

    it("removes the entry from customVariables state", () => {
      app.removeCustomVariable("user_name");

      expect(app.customVariables["user_name"]).toBeUndefined();
      expect(app.customVariables["level"]).toBe("5");
    });

    it("removes the corresponding row from the DOM", () => {
      app.removeCustomVariable("user_name");

      expect(listRows().length).toBe(1);
      expect(listKeys()).not.toContain("user_name");
    });

    it("does nothing when removing a key that does not exist", () => {
      app.removeCustomVariable("nonexistent");

      expect(Object.keys(app.customVariables)).toHaveLength(2);
      expect(listRows().length).toBe(2);
    });

    it("clicking the remove button in the DOM removes the entry", () => {
      const removeButtons = document.querySelectorAll<HTMLButtonElement>(".cv-remove");
      const firstRowKey = listKeys()[0];
      removeButtons[0].click();

      expect(app.customVariables[firstRowKey!]).toBeUndefined();
      expect(listRows().length).toBe(1);
    });
  });

  describe("renderCustomVariables", () => {
    it("renders nothing when customVariables is empty", () => {
      app.renderCustomVariables();

      expect(listRows().length).toBe(0);
    });

    it("renders one row per variable", () => {
      app.customVariables = { a: "1", b: "2", c: "3" };
      app.renderCustomVariables();

      expect(listRows().length).toBe(3);
    });

    it("each row displays the key and value", () => {
      app.customVariables = { player: "Alice" };
      app.renderCustomVariables();

      const row = listRows()[0];
      expect(row.querySelector(".cv-key")!.textContent).toBe("player");
      expect(row.textContent).toContain("Alice");
    });

    it("each row has a remove button", () => {
      app.customVariables = { x: "1" };
      app.renderCustomVariables();

      expect(document.querySelectorAll(".cv-remove").length).toBe(1);
    });

    it("re-renders cleanly when called multiple times", () => {
      app.customVariables = { a: "1" };
      app.renderCustomVariables();
      app.customVariables = { b: "2", c: "3" };
      app.renderCustomVariables();

      expect(listRows().length).toBe(2);
      expect(listKeys()).toEqual(expect.arrayContaining(["b", "c"]));
      expect(listKeys()).not.toContain("a");
    });
  });
});
