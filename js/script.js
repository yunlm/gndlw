window.addEventListener("load", init);

function init() {
    // 幅と高さを指定
    const width = window.innerWidth;
    const height = window.innerHeight;

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer();
    document.body.appendChild(renderer.domElement);
  
    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 500;

    // ポイントを作成
    const points = [
      [60,180], [120,240], [180,300], [280,180], [180,120], [60,60], [60,180]
    ];
    for (let i = 0; i < points.length; i++) {
      const x = points[i][0];
      const y = points[i][0];
      const z = points[i][1];
      points[i] = new THREE.Vector3(x, y, z);
    }
    
    // パスを作成
    const path = new THREE.CatmullRomCurve3(points);

    // ジオメトリを作成
    const geometry = new THREE.TubeGeometry(path, 100, 10, 10, true);

    // マテリアルを作成
    const material = new THREE.MeshLambertMaterial({
      color: 0x64E5E8,
      wireframe: true
    });

    // メッシュを作成
    const mesh = new THREE.Mesh(geometry, material);
    const ambient = new THREE.AmbientLight();
    scene.add(mesh, ambient);

    let percentage = 0;
    function render() {
      percentage += 0.00100;
      const p1 = path.getPointAt(percentage % 1);
      const p2 = path.getPointAt((percentage + 0.01) % 1);
      camera.position.set(p1.x, p1.y, p1.z);
      camera.lookAt(p2);
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    render();
  
    window.addEventListener("resize", onResize);
  
    // リサイズ処理
    function onResize() {
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    onResize();
}