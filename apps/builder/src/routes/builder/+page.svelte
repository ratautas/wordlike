<script lang="ts">
  import { browser, building, dev, version } from "$app/environment";
  import * as Y from "yjs";

  import type { PageData } from "../$types";
  import { docStore } from "$lib/stores/doc";
  import initialDoc from "$lib/mock/doc.json";
  import { text } from "svelte/internal";

  export let data: PageData;

  const isArray = (val: any) => Array.isArray(val);
  const isObject = (val: any) => typeof val === "object" && !isArray(val);

  // Write a function that takes a JSON object and returns a Yjs object
  // with deeply nested y arrays and y maps:

  const jsonToYjs = (jsonValue) => {
    if (isArray(jsonValue)) {
      const yArray = new Y.Array();
      const items = jsonValue.map((item) => jsonToYjs(item));
      yArray.insert(0, items);
      return yArray;
    } else if (isObject(jsonValue)) {
      const yMap = new Y.Map();
      Object.entries(jsonValue).forEach(([key, value]) => {
        yMap.set(key, jsonToYjs(value));
      });
      return yMap;
    } else {
      return jsonValue;
    }
  };

  const yDoc = new Y.Doc();

  const what = jsonToYjs(initialDoc);

  $docStore = initialDoc;

  let newTodo = "";

  const addTodo = () => {
    // $docStore?.todos.push({
    //   title: value,
    //   completed: false,
    // });
    console.log($docStore);
    // $docStore.some = newTodo;
    // newTodo = "";
  };

  const removeTodo = (todo) => {
    $docStore?.todos.splice($docStore.todos.indexOf(todo), 1);
  };
</script>

<a href="/">Home</a>

<div>
  {JSON.stringify(yDoc.toJSON())}
</div>

<form on:submit|preventDefault={addTodo}>
  <input
    class="new-todo"
    autocomplete="off"
    placeholder="What needs to be done?"
    bind:value={newTodo}
  />
</form>

{#if $docStore?.todos}
  <ul class="todo-list">
    {#each $docStore.todos as todo}
      <li class="todo">
        <div>
          <label>
            <input
              class="toggle"
              type="checkbox"
              bind:checked={todo.completed}
            />
            {todo.title}
          </label>
          <button class="destroy" on:click={() => removeTodo(todo)}
            >Delete</button
          >
        </div>
      </li>
    {/each}
  </ul>
{/if}

{#if data.session}
  <p>Welcome, {data.session.user.email}</p>
{:else}
  <a href="/login">Log in</a>
  <a href="/register">Register</a>
{/if}
