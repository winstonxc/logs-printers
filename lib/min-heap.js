"use strict";

module.exports = class MinHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  parent(index) {
    return this.heap[this.getParentIndex(index)];
  }

  hasParent(index) {
    return this.getParentIndex(index) >= 0;
  }

  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  leftChild(index) {
    return this.heap[this.getLeftChildIndex(index)];
  }

  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.heap.length;
  }

  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  rightChild(index) {
    return this.heap[this.getRightChildIndex(index)];
  }

  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.heap.length;
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]]
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  add(item) {
    this.heap.push(item);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while(this.hasParent(index) && this.parent(index).logEntry.date > this.heap[index].logEntry.date) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  removeMin() {
    if (this.heap.length === 0) return null;

    const minItem = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.heapifyDown();
    return minItem;
  }

  heapifyDown() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      if (this.hasRightChild(index) && this.rightChild(index).logEntry.date < this.leftChild(index).logEntry.date) {
          smallerChildIndex = this.getRightChildIndex(index);
      }

      if (this.heap[index].logEntry.date < this.heap[smallerChildIndex].logEntry.date) {
          break;
      }
      
      this.swap(index, smallerChildIndex);

      index = smallerChildIndex;
    }
  }
}
