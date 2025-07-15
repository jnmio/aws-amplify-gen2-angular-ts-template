import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

const client = generateClient<Schema>();

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent implements OnInit {
  todos: any[] = [];
  amplifyConfigured = false;

  ngOnInit(): void {
    this.checkAmplifyConfiguration();
    this.listTodos();
  }

  checkAmplifyConfiguration() {
    this.amplifyConfigured = !!(client && client.models && client.models.Todo);
    if (!this.amplifyConfigured) {
      console.warn('Amplify data client not properly configured. Please run "npx ampx generate outputs" after deploying your backend.');
    }
  }

  listTodos() {
    if (!this.amplifyConfigured) {
      return;
    }
    
    try {
      client.models.Todo.observeQuery().subscribe({
        next: ({ items, isSynced }) => {
          this.todos = items;
        },
        error: (error) => {
          console.error('Error in observeQuery subscription:', error);
        }
      });
    } catch (error) {
      console.error('error fetching todos', error);
    }
  }

  createTodo() {
    if (!this.amplifyConfigured) {
      alert('Todo functionality is not available. Amplify backend needs to be configured.');
      return;
    }

    try {
      const content = window.prompt('Todo content');
      if (content) {
        client.models.Todo.create({
          content: content,
        });
        this.listTodos();
      }
    } catch (error) {
      console.error('error creating todos', error);
    }
  }
}
