# Nikomaru-vrc Nikomaru's portfolio site for VRChat

## ✨ Overview

This is a website to showcase something related to VRChat.

## Main Tech Stack
- Framework: Next.js 15 (with Opennext)
- Language: TypeScript
- Package Manager: pnpm
- Headless Library: Radix UI
- Component Library: Shadcn UI
- 3D Rendering: Three.js
- CSS Library: Tailwind CSS
- Deployment: Cloudflare Workers

## Development

### Compress Models

```bash
pnpx @gltf-transform/cli optimize tree.gltf tree.glb --compress draco --texture-compress webp
```

## License

Written in 2025 by Nikomaru. No Rights Reserved.

To the extent possible under law, Nikomaru has waived all copyright and related or neighboring rights to nikomaru-vrc. This work is published from: Japan.<br />
You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see [About CC0](http://creativecommons.org/publicdomain/zero/1.0/).

## Special Thanks
Using test model from [KhronosGroup/glTF-Sample-Models](https://github.com/KhronosGroup/glTF-Sample-Models) repository.
- [WaterBottle](https://github.com/KhronosGroup/glTF-Sample-Models/tree/main/2.0/WaterBottle)
- [ToyCar](https://github.com/KhronosGroup/glTF-Sample-Models/tree/main/2.0/ToyCar)

---

Built with ❤️ using Next.js and Three.js.
