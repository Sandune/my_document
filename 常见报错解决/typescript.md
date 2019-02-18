## 语法错误

1. 关于for in / for of

```typescript
for (const i in data) // 报错 ：for (... in ...) statements must be filtered with an if statement (forin)
for (const i of Object.keys(data))
```